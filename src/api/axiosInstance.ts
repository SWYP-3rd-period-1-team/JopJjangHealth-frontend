import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://3.36.251.109:8080',
});

export default axiosInstance;
