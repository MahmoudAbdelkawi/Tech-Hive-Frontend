import DataFetching from "../baseEndpoints";
import { LoginDto, RegisterDto } from "../types"

export const loginApi = async (formBody :LoginDto ) =>{
    return await DataFetching.post('/users/login', formBody);
}

export const registerApi = async (formBody :RegisterDto ) =>{
    return await DataFetching.post('/users/signup', formBody);
}