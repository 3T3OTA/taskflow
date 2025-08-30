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

export const getBoards = async () => {
    try {
        const response = await api.get('/boards/me');
        return response.data;
    } catch (error) {
        if (error && typeof error === 'object' && 'response' in error && error.response && typeof error.response === 'object' && 'data' in error.response) {
            throw (error as any).response.data;
        }
        throw error;
    }
}

export const createBoard = async (title: string) => {
    try {
        const response = await api.post('/boards/create', { title });
        return response.data;
    } catch (error) {
        if (error && typeof error === 'object' && 'response' in error && error.response && typeof error.response === 'object' && 'data' in error.response) {
            throw (error as any).response.data;
        }
        throw error;
    }
}

export const getBoardById = async (id: string) => {
    try {
        const response = await api.get(`/boards/me/${id}`);
        return response.data;
    } catch (error) {
        if (error && typeof error === 'object' && 'response' in error && error.response && typeof error.response === 'object' && 'data' in error.response) {
            throw (error as any).response.data;
        }
        throw error;
    }
}

export const listsOrderUpdate = async (boardId: string, listData: string[]) => {
    try {
        const response = await api.put(`/boards/${boardId}/lists/order`, { listData });
        return response.data;
    } catch (error) {
        if (error && typeof error === 'object' && 'response' in error && error.response && typeof error.response === 'object' && 'data' in error.response) {
            throw (error as any).response.data;
        }
        throw error;
    }
}

export const addListsToBoard = async (boardId: string, title: string) => {
    try {
        const response = await api.post(`/boards/${boardId}/list/add`, { title });
        return response.data;
    } catch (error) {
        if (error && typeof error === 'object' && 'response' in error && error.response && typeof error.response === 'object' && 'data' in error.response) {
            throw (error as any).response.data;
        }
        throw error;
    }
}

export const deleteListfromBoard = async (boardId: string, listId: string) => {
    try {
        const response = await api.delete(`/boards/${boardId}/list/${listId}`);
        return response.data;
    } catch (error) {
        if (error && typeof error === 'object' && 'response' in error && error.response && typeof error.response === 'object' && 'data' in error.response) {
            throw (error as any).response.data;
        }
        throw error;
    }
}

export const updateListInBoard = async (boardId: string, listId: string, title: string) => {
    try {
        const response = await api.put(`/boards/${boardId}/list/${listId}/update`, { title });
        return response.data;
    } catch (error) {
        if (error && typeof error === 'object' && 'response' in error && error.response && typeof error.response === 'object' && 'data' in error.response) {
            throw (error as any).response.data;
        }
        throw error;
    }
}

export const addTaskToList = async (boardId: string, listId: string, title: string) => {
    try {
        const response = await api.post(`/boards/${boardId}/list/${listId}/task/add`, { title });
        return response.data;
    } catch (error) {
        if (error && typeof error === 'object' && 'response' in error && error.response && typeof error.response === 'object' && 'data' in error.response) {
            throw (error as any).response.data;
        }
        throw error;
    }
}

export const moveAndOrderTasks = async (
    boardId: string,
    sourceListId: string,
    destListId: string,
    destOrderedTaskIds: string[],
    movedTaskId: string
) => {
    try {
        const response = await api.put(`/boards/${boardId}/task/move`, {
            sourceListId,
            destListId,
            destOrderedTaskIds,
            movedTaskId
        });
        return response.data;
    } catch (error) {
        if (error && typeof error === 'object' && 'response' in error && error.response && typeof error.response === 'object' && 'data' in error.response) {
            throw (error as any).response.data;
        }
        throw error;
    }
}

export const deleteTaskfromList = async (boardId: string, listId: string, taskId: string) => {
    try {
        const response = await api.delete(`/boards/${boardId}/list/${listId}/task/${taskId}`);
        return response.data;
    } catch (error) {
        if (error && typeof error === 'object' && 'response' in error && error.response && typeof error.response === 'object' && 'data' in error.response) {
            throw (error as any).response.data;
        }
        throw error;
    }
}

export const updateTask = async (boardId: string, listId: string, taskId: string, title: string) => {
    try {
        const response = await api.put(`/boards/${boardId}/list/${listId}/task/${taskId}/update`, { title });
        return response.data;
    } catch (error) {
        if (error && typeof error === 'object' && 'response' in error && error.response && typeof error.response === 'object' && 'data' in error.response) {
            throw (error as any).response.data;
        }
        throw error;
    }
}