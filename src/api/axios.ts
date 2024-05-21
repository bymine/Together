import axios from 'axios';
import { silentRefresh } from './auth';
// axios 모듈화

const API_URL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: 'Bearer/ ',
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    // 응답을 받은 후 실행
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      try {
        await silentRefresh();
      } catch (error) {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
