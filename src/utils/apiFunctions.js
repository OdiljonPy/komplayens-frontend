import axios from 'axios';
// const MainURL = 'http://176.221.28.202:8009/api/v1';
const MainURL = 'https://api.komplayens.uz/api/v1';

const axiosInstance = axios.create({
  baseURL: MainURL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

const errorMessages = {
  401: { result: "Unauthorized access", http_status: 401 },
  400: { result: "Invalid input provided", http_status: 400 },
  404: { result: "Resource not found", http_status: 404 },
  400: { result: "Validate Error", http_status: 400 },
  403: { result: "Permission denied", http_status: 403 },
  400: { result: "User already exists", http_status: 400 },
  400: { result: "User does not exist", http_status: 400 },
  400: { result: "Incorrect password", http_status: 400 },
  400: { result: "User blocked", http_status: 400 },
};

axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    if (error.response) {
      const status = error.response.status;
      const errorMessage = errorMessages[status] || { result: 'Server error', http_status: 500 };
      return Promise.reject({ ...error, customError: errorMessage });
    }
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
      error: error.customError || { status: 500, data: 'Server error' },
    };
  }
};
