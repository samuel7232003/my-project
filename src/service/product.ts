import axios from "axios";

const BASE_URL = "https://fakestoreapi.com";

export const serviceGetAllProducts = async () => {
    const response = await axios.get(`${BASE_URL}/products`);
    return response;
}

export const serviceGetProductById = async (id: number) => {
    const response = await axios.get(`${BASE_URL}/products/${id}`);
    return response;
}