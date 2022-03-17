import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3099',
});

instance.interceptors.response.use((response) => response.data, () => {
  alert('Ошибка сервера!');
  return Promise.reject();
});

export default instance;
