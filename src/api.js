import Axios from 'axios';


const instance = Axios.create({ 
    baseURL: 'https://social-network.samuraijs.com/api/1.1//todo-lists',
    withCredentials: true,
    headers: { 'API-KEY': '5deaa5a9-bfea-4e80-bac8-d313181506e0' }
 })

export const api = {

    restoreLists() {
        return instance.get('')
    },

    updateListTitle( listId, title ) {
        return instance.put(`/${listId}`, {title} )
    },

    addList(title) {
        return instance.post('', { title } )
    },

    deleteList(listId) {
        return instance.delete(`/${listId}`)
    },

    restoreTasks(listId) {
        return instance.get(`/${listId}/tasks?count=10`)
    },

    addTask(listId, title) {
        return instance.post(`/${listId}/tasks`, {title} )
    },

    updateTask(listId, taskId, dataObj) {
        return instance.put(`/${listId}/tasks/${taskId}`, { ...dataObj } )
    },

    deleteTask(listId, taskId) {
        return instance.delete(`/${listId}/tasks/${taskId}`)
    },

    setTasksPage(listId, page = 1) {
        return instance.get(`/${listId}/tasks?count=10&page=${page}`)
    }
            
}