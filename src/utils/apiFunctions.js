import axios from 'axios';
// const MainURL = 'http://176.221.28.202:8009/api/v1';
const MainURL = 'https://api-dev.komplayens.uz/api/v1';

const axiosInstance = axios.create({
  baseURL: MainURL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});
axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    return Promise.reject(error);
  }
);
export const sendRequest = async ({ method, url, data = {}, token = null, params = {} }) => {
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token.replace(/^"|"$/g, '')}`;
  }
  // Add language header based on current language
  const currentLang = localStorage.getItem('i18nextLng') || 'uz';
  axiosInstance.defaults.headers.common['Accept-Language'] = currentLang;

  try {
    const response = await axiosInstance({
      method,
      url,
      data,
      params,
    });
    return { success: true, data: response.data, status: response.status };
  } catch (error) {
    return {
      success: false,
      error: error.response ? { status: error.response.status, data: error.response.data } : { status: 500, data: 'Server error' },
    };
  }
};
