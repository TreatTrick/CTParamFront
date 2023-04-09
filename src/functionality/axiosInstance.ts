import axios, { AxiosInstance } from 'axios';
import config from './frontend_config.json';

export function createAxiosInstance(baseURL: string): AxiosInstance {
    return axios.create({
        baseURL: baseURL,
        withCredentials: true,  // Ensure cookies are sent with requests
    });
}

const api = createAxiosInstance('');

export default api;