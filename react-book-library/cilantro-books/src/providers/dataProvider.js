import { fetchUtils } from "react-admin";

const apiUrl = "https://glorious-potato-x65qr9w99jghvgv-4000.app.github.dev/api/records/v1"; // Replace with your URL

const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }
  
  // Add your Trailbase Bearer Token
  options.headers.set("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJFZERTQSJ9.eyJzdWIiOiJyZlJjWk1DRlN4S29QSWdaT3BaSnJBPT0iLCJpYXQiOjE3NjgwODcwNTEsImV4cCI6MTc2ODA5MDY1MSwiZW1haWwiOiJhZG1pbkBsb2NhbGhvc3QiLCJjc3JmX3Rva2VuIjoiTVk1UERWb2VwbDZOZnNRMVRWRnYiLCJhZG1pbiI6dHJ1ZX0.P06-MLvXeUJ9eedBhzmFnyWLZQQUmhWu5Lf48TXmVAnhoq_gMxy0KUQznD7Bj3Rm6SsM-jYmgY2WJrMzClw5AQ"); // Replace with your token
  
  return fetchUtils.fetchJson(url, options);
};

const buildFilterQuery = (filter) => {
  const params = new URLSearchParams();
  for (const key in filter) {
    const value = filter[key];
    if (value === undefined || value === null || value === '') {
      continue;
    }
    if (key === 'q') {
      params.append('filter[title][$like]', `%${value}%`);
    } else {
      params.append(`filter[${key}][$eq]`, value);
    }
  }
  return params.toString();
};

const buildListQuery = (params) => {
  const { pagination, sort, filter } = params;
  const query = new URLSearchParams();

  if (pagination) {
    const { page, perPage } = pagination;
    query.append('limit', perPage);
    query.append('offset', (page - 1) * perPage);
  }

  if (sort) {
    const { field, order } = sort;
    query.append('order', `${order === 'DESC' ? '-' : ''}${field}`);
  }

  if (filter) {
    const filterParams = new URLSearchParams(buildFilterQuery(filter));
    filterParams.forEach((value, key) => {
      query.append(key, value);
    });
  }
  
  query.append('count', 'true');
  return query.toString();
};

// =====================================================
// DATA PROVIDER
// =====================================================
const dataProvider = {
  getList: async (resource, params) => {
    const queryString = buildListQuery(params);
    const url = `${apiUrl}/${resource}?${queryString}`;
    const { json } = await httpClient(url);
    const records = json.records || [];
    const total = json.total_count || records.length;

    return {
      data: records.map((record) => ({ ...record, id: record.id })),
      total: total,
    };
  },

  getOne: async (resource, params) => {
    const url = `${apiUrl}/${resource}/${params.id}`;
    const { json } = await httpClient(url);
    return { data: { ...json, id: json.id } };
  },

  getMany: async (resource, params) => {
    try {
      const records = await Promise.all(
        params.ids.map(id => dataProvider.getOne(resource, { id }))
      );
      const data = records.map(record => record.data);
      return { data };
    } catch (error) {
      console.error("getMany error:", error);
      return { data: [] };
    }
  },

  getManyReference: async (resource, params) => {
    const combinedFilter = {
      ...params.filter,
      [params.target]: params.id,
    };
    
    const queryString = buildListQuery({
      ...params,
      filter: combinedFilter,
    });
    
    const url = `${apiUrl}/${resource}?${queryString}`;
    const { json } = await httpClient(url);
    const records = json.records || [];
    const total = json.total_count || records.length;

    return {
      data: records.map((record) => ({ ...record, id: record.id })),
      total: total,
    };
  },

  create: async (resource, params) => {
    try {
      console.log('=== CREATE REQUEST ===');
      console.log('Resource:', resource);
      console.log('Original data:', params.data);
      
      // Clean the data for user_books specifically
      let cleanedData = { ...params.data };
      
      if (resource === 'user_books') {
        // Remove any fields that shouldn't be sent
        delete cleanedData.id;
        delete cleanedData.created_at;
        delete cleanedData.updated_at;
        
        // Handle dates - convert to ISO string or remove if empty
        if (cleanedData.date_added) {
          cleanedData.date_added = new Date(cleanedData.date_added).toISOString().split('T')[0];
        } else {
          delete cleanedData.date_added;
        }
        
        if (cleanedData.date_started) {
          cleanedData.date_started = new Date(cleanedData.date_started).toISOString().split('T')[0];
        } else {
          delete cleanedData.date_started;
        }
        
        if (cleanedData.date_finished) {
          cleanedData.date_finished = new Date(cleanedData.date_finished).toISOString().split('T')[0];
        } else {
          delete cleanedData.date_finished;
        }
        
        // Ensure is_favorite is 0 or 1
        cleanedData.is_favorite = cleanedData.is_favorite ? 1 : 0;
        
        // Ensure all IDs are integers
        if (cleanedData.user_id) cleanedData.user_id = parseInt(cleanedData.user_id);
        if (cleanedData.book_id) cleanedData.book_id = parseInt(cleanedData.book_id);
        if (cleanedData.status_id) cleanedData.status_id = parseInt(cleanedData.status_id);
      }
      
      console.log('Cleaned data to send:', cleanedData);
      console.log('Sending to URL:', `${apiUrl}/${resource}`);
      
      const { json } = await httpClient(`${apiUrl}/${resource}`, {
        method: 'POST',
        body: JSON.stringify(cleanedData),
      });
      
      console.log('Response:', json);
      
      if (json.ids && json.ids.length > 0) {
        const createdId = json.ids[0];
        const { json: createdRecord } = await httpClient(
          `${apiUrl}/${resource}/${createdId}`
        );
        return { data: { ...createdRecord, id: createdId } };
      }
      
      throw new Error("Trailbase create: no ID returned");
    } catch (error) {
      console.error("=== CREATE ERROR ===");
      console.error("Error details:", error);
      console.error("Error status:", error.status);
      console.error("Error body:", error.body);
      throw error;
    }
  },

  update: async (resource, params) => {
    const url = `${apiUrl}/${resource}/${params.id}`;
    const payload = { ...params.data };
    
    delete payload.id;
    delete payload.created_at;
    delete payload.updated_at;

    console.log("Updating record:", payload);

    await httpClient(url, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
    
    return { data: params.data };
  },

  delete: async (resource, params) => {
    const url = `${apiUrl}/${resource}/${params.id}`;
    await httpClient(url, { method: "DELETE" });
    return { data: params.previousData };
  },
};

export default dataProvider;