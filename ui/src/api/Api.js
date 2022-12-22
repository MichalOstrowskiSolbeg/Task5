import axios from "axios";

const instance = axios.create({
    baseURL: 'https://localhost:44378/api'
});

instance.interceptors.request.use(
    async config => {
        config.headers = {
            'Content-Type': 'application/json'
        }
        return config;
    },
    error => {
        Promise.reject(error)
    });

export default instance;