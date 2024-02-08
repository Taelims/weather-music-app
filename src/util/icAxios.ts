import axios from 'axios';

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
    console.log('Response Interceptor:', response);
    return response;
  },
  error => {

    const statusCode = error.response ? error.response.status : null;

    switch (statusCode) {
      case 401:
        console.log('Unauthorized error');
        break;
      case 404:
        console.log('Not Found error');
        break;
      default:
        console.error('An error occurred:', error);
        break;
    }
    return Promise.reject(error);
  }
);

export default icAxios;