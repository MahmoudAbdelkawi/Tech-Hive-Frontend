import DataFetching from "../baseEndpoints";
import { ProductDto } from "../types";

export const getProductsApi = async (page : number = 1) => {
    return await DataFetching.get(`/products/getAllProduct?page=${page}`); 
}

export const searchOnProductApi = async (search: string) => {
    return await DataFetching.get(`/products/searchOnProduct?title=${search}`);
}

export const addProductApi = async (formBody : ProductDto) => {
    return await DataFetching.post('/products/addProduct', formBody);
}

export const deleteProductApi = async (id: number) => {
    return await DataFetching.delete(`/products/deleteProduct/${id}`);
}

export const updateProductApi = async (id: number, formBody : ProductDto) => {    
    return await DataFetching.patch(`/products/updateProduct/${id}`, formBody);
}