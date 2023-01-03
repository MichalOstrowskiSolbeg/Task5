import api from "./Api";

export async function getCategories() {
    return await api.get(`/Category`);
}