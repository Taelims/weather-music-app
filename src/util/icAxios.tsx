import axios from 'axios';
import Swal from "sweetalert2";


const icAxios = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 1000,
});

icAxios.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

icAxios.interceptors.response.use(
  response => {
    return response;
  },
  error => {

    const statusCode = error.response ? error.response.status : null;
    switch (statusCode) {
      case 401:
        Swal.fire({
          icon: 'error',
          title: '인증 오류',
          text: error.response.data.error,
        })
        break;
      case 404:
        Swal.fire({
          icon: 'error',
          title: '리소스가 없습니다',
          text: error.response.data.error,
        })
        break;
      default:
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.response.data.error,
        })
        break;
    }
    return Promise.reject(error);
  }
);

export default icAxios;