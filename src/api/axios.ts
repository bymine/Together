import axios from 'axios';

// axios 모듈화

const axiosInstance = axios.create({
  baseURL: 'https://sjna.xyz/teamup/api/web/',
  headers: {
    Authorization: 'Bearer/ ',
  },
});

// axiosInstance.interceptors.response.use(
//   (response) => {
//     // 응답을 받은 후 실행
//     return response;
//   },
//   (error) => {
//     // 응답이 실패한 경우 실행
//     return Promise.reject(error);
//   },
// );

export default axiosInstance;
