import axios from 'axios';
import Cookies from 'js-cookie';

const APP_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: APP_URL,
  headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
  },
});


api.interceptors.request.use(config => {
    const token = Cookies.get('token')
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});


export const loginUser = async (email: string, password: string) => {
    try {
        const response = await api.post('/auth/login', { email, password });
        return response.data;
    } catch (error) {
        if (error && typeof error === 'object' && 'response' in error && error.response && typeof error.response === 'object' && 'data' in error.response) {
            throw (error as any).response.data;
        }
        throw error;
    }
}

export const registerUser = async (name: string, email: string, password: string) => {
    try {
        const response = await api.post('/auth/register', { name, email, password });
        return response.data;
    } catch (error) {
        if (error && typeof error === 'object' && 'response' in error && error.response && typeof error.response === 'object' && 'data' in error.response) {
            throw (error as any).response.data;
        }
        throw error;
    }
}

export const getCurrentUser = async () => {
    try {
        const response = await api.get(`/auth/current`);
        return response.data;
    } catch (error) {
        if (error && typeof error === 'object' && 'response' in error && error.response && typeof error.response === 'object' && 'data' in error.response) {
            throw (error as any).response.data;
        }
        throw error;
    }
}