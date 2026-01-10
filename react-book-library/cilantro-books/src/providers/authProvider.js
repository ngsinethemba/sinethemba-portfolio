// src/providers/authProvider.js

const authProvider = {
  login: ({ username, password }) => {
    // Demo credentials
    if (username === 'reader' && password === 'books123') {
      localStorage.setItem('auth', JSON.stringify({
        id: 1,
        username: 'reader',
        fullName: 'Book Reader',
      }));
      return Promise.resolve();
    }
    return Promise.reject(new Error('Invalid credentials'));
  },

  logout: () => {
    localStorage.removeItem('auth');
    return Promise.resolve();
  },

  checkAuth: () => {
    return localStorage.getItem('auth')
      ? Promise.resolve()
      : Promise.reject();
  },

  checkError: (error) => {
    const status = error.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem('auth');
      return Promise.reject();
    }
    return Promise.resolve();
  },

  getIdentity: () => {
    const auth = localStorage.getItem('auth');
    if (auth) {
      const user = JSON.parse(auth);
      return Promise.resolve({
        id: user.id,
        fullName: user.fullName,
      });
    }
    return Promise.reject();
  },

  getPermissions: () => Promise.resolve(),
};

export default authProvider;  