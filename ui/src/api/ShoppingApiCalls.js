import api from "./AuthApi";

export async function Checkout(data) {
    const dataString = JSON.stringify(data)
    console.log(dataString)
    return await api.post('/Shopping/Purchase', dataString);
}