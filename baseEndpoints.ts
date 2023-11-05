import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";

const DataFetching = axios.create({
  baseURL: "http://localhost:4000/api/v1",
    headers: {
        "Content-type": "application/json",
    }
});

DataFetching.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem("token");
        
        console.log(token);
        
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error));


export default DataFetching;