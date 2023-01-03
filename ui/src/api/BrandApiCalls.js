import api from "./Api";

export async function getBrands() {
    return await api.get(`/Brand`);
}