import axios from "axios";
import { getCurrentUser } from "../helpers/UserHelper";

const instance = axios.create({
    baseURL: 'https://localhost:44378/api'
});

instance.interceptors.request.use(
    async config => {
        const user = getCurrentUser()
        let token
        if (user) {
            token = user.Token
        }
        config.headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
        return config;
    },
    error => {
        Promise.reject(error)
    });

export default instance;