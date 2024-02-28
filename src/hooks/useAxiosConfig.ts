import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://3.36.251.109:8080',
});

axiosInstance.interceptors.request.use(
    config => {
        config.headers['Content-Type'] = 'application/json; charset=UTF-8';
        config.headers.Accept = 'application/json';
        if (config.url !== 'login') {
            config.headers.Authorization = `Bearer ${'token'}`; // 발급 받은 후 저장 된 토큰을 여기에 설정
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    },
);

// 응답 인터셉터를 추가합니다.
axiosInstance.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        alert(error.response.data);
        return Promise.reject(error);
    },
);

export default axiosInstance;
