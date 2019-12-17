
const initialState =  {
    lists: []
    /* lists: [
        {
            id: 0, title: 'Спорт', nextTaskId: 2, totalCount: 1, countOnPage: 10,
            tasks: [{ id: 1, title: 'CSS', completed: false, priority: 'medium' }]
        }
    ] */
    };


const reducer = (state = initialState, action) => {

    const countOnPage = 10;
    const renderBasis = (action.page - 1)*countOnPage +1;

    switch (action.type) {

        case RESTORE_LISTS:
            return {
                ...state,
                lists: action.lists.map( (list) => {
                    return !list.tasks
                        ? { ...list, page: 1, countOnPage, tasks: [] } 
                        : { ...list, page: 1, countOnPage }
                } )
            }

        case ADD_LIST:
            const extendedList = { ...action.list, page: 1, countOnPage, tasks: [] };
            return {
                ...state,
                lists: [ extendedList, ...state.lists ]
            }

        case UPDATE_LIST_TITLE:
            return {
                ...state,
                lists: state.lists.map( (list) => {
                    if (list.id === action.listId) return ({ ...list, title: action.title })
                    else return list
                } )
            }

        case DELETE_LIST:
            return {
                ...state,
                lists: 
                    state.lists.filter((list) => list.id !== action.listId)
            }

        case RESTORE_TASKS:
            return {
                ...state,
                lists: state.lists.map(list => {
                    return list.id === action.listId
                        ? {
                            ...list,
                            totalCount: action.totalCount,
                            tasks: !action.tasks 
                                ? [] 
                                : action.tasks.filter( (task, index) => index < countOnPage )
                                    .map( (task, index) => ({...task, renderIndex: index + 1 }) )
                        }
                        : list
                })
            }

        case SET_TASKS_PAGE:
            return {
                ...state,
                lists: state.lists.map( (list) => {
                    if (list.id === action.listId) {
                        return {
                            ...list,
                            totalCount: action.totalCount ? action.totalCount : list.totalCount,
                            page: action.page,
                            tasks: action.tasks
                                .map((task, index) => ({ ...task, renderIndex: renderBasis + index }))
                        }
                    } else return list
                })
            }

        case ADD_TASK:
            return {
                ...state,
                lists: state.lists.map((list) => {
                    if (list.id === action.task.todoListId) {
                        return {
                            ...list,
                            totalCount: list.totalCount + 1,
                            tasks: [action.task, ...list.tasks]
                                .map((task, index) => ({ ...task, renderIndex: index + 1 }))
                        }
                    } else return list;

                })
            }

        case DELETE_TASK:
            return {
                ...state,
                lists: state.lists.map((list) => {
                    if (list.id === action.listId) {
                        return {
                            ...list,
                            totalCount: list.totalCount-1,
                            tasks:
                                list.tasks.filter((task) => task.id !== action.taskId)
                                    .map( (task, index) => ({ ...task, renderIndex: renderBasis + index })  )
                        }
                    } else return list
                })
            }

        case UPDATE_TASK:

            return {
                ...state,
                lists: state.lists.map((list) => {
                    if (list.id === action.task.todoListId) {
                        return {
                            ...list,
                            tasks: list.tasks.map((task) => {
                                if (task.id === action.task.id) {
                                    return { ...task, ...action.task }
                                } else return task
                            })
                        }
                    } else return list;
                })
            }

        case SET_FLTR_TASKS_PAGE:
            const totalCount = action.tasks.filter((task) => task.completed === action.completed).length;
            return {
                ...state,
                lists: state.lists.map((list) => {
                    if (list.id === action.listId) {
                        return {
                            ...list,
                            page: action.page,
                            totalCount,
                            generalCount: action.tasks.length,
                            tasks: action.tasks
                                .filter((task) => task.completed === action.completed)
                                .map((task, index) => ({ ...task, renderIndex: index + 1}))
                                .filter((task, index) =>
                                    (index >= (action.page - 1) * countOnPage && index < action.page * countOnPage))
                        }
                    } else return list
                })
            }

        case DELETE_FLTR_TASK:
            return {
                ...state,
                lists: state.lists.map((list) => {
                    if (list.id === action.listId) {
                        return {
                            ...list,
                            tasks: list.tasks.filter((task) => task.id !== action.taskId)
                                .map((task, index) => ({ ...task, renderIndex: renderBasis + index }))
                        }
                    } else return list
                })
            }

        default: return state;
    }

}

export default reducer;

const RESTORE_LISTS = 'RESTORE-LISTS';
export const restoreLists = (lists) => ({ type: RESTORE_LISTS, lists })

const ADD_LIST = 'ADD_LIST';
export const addList = (list) => ({type: ADD_LIST, list})

const UPDATE_LIST_TITLE = 'UPDATE_LIST_TITLE';
export const updateListTitle = (listId, title) => ({ type: UPDATE_LIST_TITLE, listId, title })

const DELETE_LIST = 'DELETE_LIST';
export const deleteList = (listId) => ({type: DELETE_LIST, listId})

const RESTORE_TASKS = 'RESTORE_TASKS';
export const restoreTasks = (listId, tasks, totalCount) => ({ type: RESTORE_TASKS, listId, tasks, totalCount })

const SET_TASKS_PAGE = 'SET_TASKS_PAGE';
export const setTasksPage = (listId, page, tasks, totalCount) =>
    ({ type: SET_TASKS_PAGE, listId, page, tasks, totalCount })

const SET_FLTR_TASKS_PAGE = 'SET_FLTR_TASKS_PAGE';
export const setFltrTasksPage = (listId, page, tasks, completed) =>
    ({ type: SET_FLTR_TASKS_PAGE, listId, page, tasks, completed })

const ADD_TASK = 'ADD_TASK';
export const addTask = (task) => ({type: ADD_TASK, task})

const DELETE_TASK = 'DELETE_TASK';
export const deleteTask = (listId, taskId, page) => ({ type: DELETE_TASK, listId, taskId, page })

const DELETE_FLTR_TASK = 'DELETE_FLTR_TASK';
export const deleteFltrTask = (listId, taskId, page) => ({ type: DELETE_FLTR_TASK, listId, taskId, page })

const UPDATE_TASK = 'UPDATE_TASK';
export const updateTask = (task) => ({type: UPDATE_TASK, task })