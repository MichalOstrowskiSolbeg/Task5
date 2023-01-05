import api from "./AuthApi";

export function getOrderList() {
    return api.get(`/Order`);
}

export function getOrder(id) {
    return api.get(`/Order/${id}`);
}