import api from "./AuthApi";

export async function Checkout(data) {
    const dataString = JSON.stringify(data)
    return await api.post('/Shopping/Purchase', dataString);
}