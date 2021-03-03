import Axios from "axios";

const instance = Axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/todo-lists",
  withCredentials: true,
  headers: { "API-KEY": "077e296e-5c11-448c-9cff-a20ca6e66ed1" },
});

export const api = {
  restoreLists() {
    return instance.get("");
  },

  updateListTitle(listId, title) {
    return instance.put(`/${listId}`, { title });
  },

  addList(title) {
    return instance.post("", { title });
  },

  reorderList(listId, putAfterItemId) {
    return instance.put(`/${listId}/reorder`, { putAfterItemId });
  },

  deleteList(listId) {
    return instance.delete(`/${listId}`);
  },

  getTasks(listId, count = 10) {
    return instance.get(`/${listId}/tasks?count=${count}`);
  },

  getAllTasks(listId) {
    return instance.get(`/${listId}/tasks?count=100`);
  },

  getTasksOnPage(listId, page = 1) {
    return instance.get(`/${listId}/tasks?count=10&page=${page}`);
  },

  addTask(listId, title) {
    return instance.post(`/${listId}/tasks`, { title });
  },

  updateTask(listId, taskId, dataObj) {
    return instance.put(`/${listId}/tasks/${taskId}`, { ...dataObj });
  },

  deleteTask(listId, taskId) {
    return instance.delete(`/${listId}/tasks/${taskId}`);
  },

  reorderTask(listId, taskId, putAfterItemId) {
    return instance.put(`/${listId}/tasks/${taskId}/reorder`, {
      putAfterItemId,
    });
  },
};
