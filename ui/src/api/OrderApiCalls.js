import api from "./AuthApi";

export async function getOrderList() {
    return await api.get(`/Order`);
}

export async function getOrder(id) {
    return await api.get(`/Order/${id}`);
}

export async function changeOrderStatus(id, status) {
    return await api.put(`/Order/${id}?status=${status}`);
}