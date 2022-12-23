import api from "./AuthApi";

export async function Checkout() {
    return await api.post('/Shopping/Purchase');
}