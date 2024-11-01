import axios from 'axios';

const { VITE_API_URL, VITE_APP_AUTH } = import.meta.env

const axiosApi = axios.create({
  baseURL: `${VITE_API_URL}/api/v1/admin`,
});

axiosApi.defaults.headers.post['Content-Type'] = 'application/json';

axiosApi.interceptors.request.use(async (config) => {
  if (localStorage.getItem(VITE_APP_AUTH)) {
    const data = localStorage.getItem(VITE_APP_AUTH);
    const token = data ? `${JSON.parse(data).access_token}` : null;
    const { headers } = config;
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    return { ...config, headers };
  } else {
    return { ...config };
  }
});

axiosApi.interceptors.response.use(
  (response) => {
    //console.log("response");
    //console.log(response);
    return response;
  },
  async (error) => {
    if (error.code === "ERR_NETWORK") {
      console.log('ERR_NETWORK')
      return Promise.reject(error);
    } else if (error.status === 403 || error.status === 401) {
      //await refreshTokenFn(error);
      return Promise.reject(error);
    } else {
      return Promise.reject(error);
    }
  }
);

export async function get(url: string, config = {}) {
  return await axiosApi
    .get(url, { ...config })
    .then((response) => response.data);
}
  
export async function post(url: string, data = {}, config = {}) {
  return axiosApi
    .post(url, { ...data }, { ...config })
    .then((response) => response.data);
}
  
export async function put(url: string, data = {}, config = {}) {
  return axiosApi
    .put(url, { ...data }, { ...config })
    .then((response) => response.data);
}
  
export async function del(url: string, config = {}) {
  return await axiosApi
    .delete(url, { ...config })
    .then((response) => response.data);
}

export async function postFile(url: string, data = {}) {
  return axiosApi
    .post(
      url,
      { ...data },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
    .then((response) => response.data);
}