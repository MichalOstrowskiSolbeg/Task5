import api from "./Api";

export async function Login(user) {
    const userString = JSON.stringify(user)
    return await api.post('/User/login', userString);
}

export function Register(user) {
    const userString = JSON.stringify(user)
    return api.post('/User/register', userString);
}