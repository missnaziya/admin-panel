import axios from "axios";

const config = {
    baseURL: process.env.REACT_APP_BASE_URL,
    timeout: 25000,
    headers: {
        "Content-Type": "application/json",
    },
};

// axios instance creation
export const AxiosServiceLoaderless = axios.create(config);
const AxiosService = axios.create(config);

// request interceptor
AxiosService.interceptors.request.use(
    async (config) => {
        // spinning start to show
        document.body.classList.add("loading-indicator");
        return config;
    },
    (error) => {
        document.body.classList.remove("loading-indicator");
        return Promise.reject(error);
    }
);

// response interceptor
AxiosService.interceptors.response.use(
    async (response) => {
        // spinning hide
        document.body.classList.remove("loading-indicator");
        return response;
    },

    async (error) => {
        document.body.classList.remove("loading-indicator");
        return Promise.reject(error);
    }
);

export default AxiosService;