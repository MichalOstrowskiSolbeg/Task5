import api from "./Api";

export function getProductList(page, search, brand, category, priceFrom, priceTo) {
    return api.get(`/Product?Search=${search}&Page=${page}&Brand=${brand}&Category=${category}&PriceFrom=${priceFrom}&PriceTo=${priceTo}`);
}

export function getProductDefaultList() {
    return api.get(`/Product`);
}

export function getProduct(Id) {
    return api.get(`/Product/${Id}`);
}