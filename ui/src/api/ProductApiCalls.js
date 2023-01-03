import api from "./Api";

export function getProductList(data) {
    const stringData = JSON.stringify(data)
    return api.post(`/Product`, stringData);
}

export function getProduct(Id) {
    return api.get(`/Product/${Id}`);
}