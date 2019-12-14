import axios from 'axios';

const API_KEY = '5deaa5a9-bfea-4e80-bac8-d313181506e0';

export const api = {

    restoreLists() {
        return axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', { withCredentials: true })
    },

    addList(title) {
        return axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists',
            { title },
            {
                withCredentials: true,
                headers: { 'API-KEY': API_KEY }
            }
        )
    },

    deleteList(listId) {
        return axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${listId}`,
            {
                withCredentials: true,
                headers: { 'API-KEY': API_KEY }
            }
        )
    },

    restoreTasks(listId) {
        return axios.get(`https://social-network.samuraijs.com/api/1.1/todo-lists/${listId}/tasks?count=10`,
            { withCredentials: true }
        )
    },

    addTask(listId, title) {
        return axios.post(`https://social-network.samuraijs.com/api/1.1/todo-lists/${listId}/tasks`,
            {title},
            {
                withCredentials: true,
                headers: { 'API-KEY': API_KEY }
            }
        )
    },

    updateTask(listId, taskId, dataObj) {
        return axios.put(
            `https://social-network.samuraijs.com/api/1.1//todo-lists/${listId}/tasks/${taskId}`,
            { ...dataObj },
            {
                withCredentials: true,
                headers: { 'API-KEY': API_KEY }
            }
        )
    },

    deleteTask(listId, taskId) {
        return axios.delete(
            `https://social-network.samuraijs.com/api/1.1//todo-lists/${listId}/tasks/${taskId}`,
            {
                withCredentials: true,
                headers: { 'API-KEY': API_KEY }
            }
        )
    }
            
}