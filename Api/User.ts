import DataFetching from "../baseEndpoints";

export const getMe = async () => {
    return await DataFetching.get('/auth/getMe');
}