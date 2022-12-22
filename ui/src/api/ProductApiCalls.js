import api from "./Api";

export function getProductList() {
    return api.get('/Product');
}

export function getProduct(Id) {
    return api.get(`/Product/${Id}`);
}