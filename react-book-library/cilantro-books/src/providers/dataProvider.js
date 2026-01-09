// trailbaseProvider.js
import { fetchUtils } from "react-admin";

const apiUrl = "https://glorious-potato-x65qr9w99jghvgv-4000.app.github.dev/api/records/v1";
const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }

  // Add your Trailbase Bearer Token here
  options.headers.set("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJFZERTQSJ9.eyJzdWIiOiJyZlJjWk1DRlN4S29QSWdaT3BaSnJBPT0iLCJpYXQiOjE3Njc5NzUzMTAsImV4cCI6MTc2Nzk3ODkxMCwiZW1haWwiOiJhZG1pbkBsb2NhbGhvc3QiLCJjc3JmX3Rva2VuIjoiZnV1dEVhNkYweWNJZmRLdGVtaWoiLCJhZG1pbiI6dHJ1ZX0.gJHvKobGCrLLM_UTq5JNzpffrEPLqI0Zr56_ANyFXX1J_koTn0ACwhOHk-hL1v0gmjj2MjO5tWHGt2eozYXECw");

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
      params.append('filter[name][$like]', `%${value}%`);
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
}

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
      console.log("Creating record:", params.data);
      const { json } = await httpClient(`${apiUrl}/${resource}`, {
        method: 'POST',
        body: JSON.stringify(params.data),
      });
      console.log("Full response:", json);
      if (json.ids && json.ids.length > 0) {
        const createdId = json.ids[0];
        const { json: createdRecord } = await httpClient(`${apiUrl}/${resource}/${createdId}`);
        return { data: { ...createdRecord, id: createdId } };
      }
      throw new Error("Trailbase create: no ID returned");
    } catch (error) {
      console.error("Trailbase create error:", error);
      throw error;
    }
  },

  update: async (resource, params) => {
    const url = `${apiUrl}/${resource}/${params.id}`;
    
    const payload = { ...params.data };

    delete payload.id;
    delete payload.created_at;
    delete payload.updated_at;

    // Convert quantity to number for gear resource
    if (resource === 'gear' && payload.quantity) {
      payload.quantity = parseFloat(payload.quantity);
    }

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

// =====================================================
// AUTH PROVIDER
// =====================================================
const authProvider = {
  // Handle login
  login: ({ username, password }) => {
    // Admin credentials
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('auth', JSON.stringify({ 
        id: 1,
        username: 'admin',
        fullName: 'Admin User',
        role: 'admin' 
      }));
      return Promise.resolve();
    }
    
    // Regular user credentials
    if (username === 'user' && password === 'user123') {
      localStorage.setItem('auth', JSON.stringify({ 
        id: 2,
        username: 'user',
        fullName: 'Regular User',
        role: 'user' 
      }));
      return Promise.resolve();
    }
    
    // Invalid credentials
    return Promise.reject(new Error('Invalid username or password'));
  },

  // Handle logout
  logout: () => {
    localStorage.removeItem('auth');
    return Promise.resolve();
  },

  // Check if user is authenticated
  checkAuth: () => {
    return localStorage.getItem('auth') 
      ? Promise.resolve() 
      : Promise.reject();
  },

  // Handle authentication errors
  checkError: (error) => {
    const status = error.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem('auth');
      return Promise.reject();
    }
    return Promise.resolve();
  },

  // Get current user identity
  getIdentity: () => {
    const auth = localStorage.getItem('auth');
    if (auth) {
      const user = JSON.parse(auth);
      return Promise.resolve({
        id: user.id,
        fullName: user.fullName,
        username: user.username
      });
    }
    return Promise.reject();
  },

  // Get user permissions/role
  getPermissions: () => {
    const auth = localStorage.getItem('auth');
    if (auth) {
      const user = JSON.parse(auth);
      return Promise.resolve(user.role);
    }
    return Promise.reject();
  }
};

// =====================================================
// EXPORTS
// =====================================================
export default dataProvider;
export { authProvider };