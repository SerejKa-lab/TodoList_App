import {api} from '../API/api'

const initialState =  {
    lists: [],
    listsProgress: { listsLoading: false, tasksLoading: false },
    maxListsCount: 10
    /* lists: [
        {
            id: 0, title: 'Спорт', nextTaskId: 2, totalCount: 1, countOnPage: 10, filterValue: 'All',
            page: 1, titleUpdating: false, taskIsAdding: false, listDeliting: false,
            tasks: [{ id: 1, title: 'CSS', completed: false, priority: 'medium', taskDeliting: false}]
        }
    ] */
    };


const reducer = (state = initialState, action) => {

    const countOnPage = 10;
    const renderBasis = (action.page - 1)*countOnPage +1;

    switch (action.type) {

  // ---------------------------List Reducers -------------------------------
        
        case RESTORE_LISTS:
            return {
                ...state,
                lists: action.lists.map( (list) => {
                    return !list.tasks
                        ? { ...list, page: 1, countOnPage, filterValue: 'All', tasks: [],
                            footerProcess: false } 
                        : { ...list, page: 1, countOnPage, filterValue: 'All',
                            footerProcess: false }
                } )
            }

        case ADD_LIST:
            const extendedList = { ...action.list, page: 1, countOnPage, filterValue: 'All', tasks: [] };
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

        case LIST_IS_LOADING:
            return {
                ...state,
                listsProgress: {...state.listsProgress, listsLoading: action.value}
            }

        case LIST_IN_PROCESS:
            return {
                ...state,
                lists: state.lists.map((list) => {
                    if (list.id === action.listId) return { ...list, [action.process]: action.value }
                    else return list
                })
            }

        case SET_FILTER_VALUE:
            return {
                ...state,
                lists: state.lists.map((list) => {
                    if (list.id === action.listId) return { ...list, filterValue: action.value }
                    else return list
                })
            }


 // ---------------------------Tasks Reducers-------------------------------
       

        case RESTORE_TASKS:
            return {
                ...state,
                lists: state.lists.map(list => {
                    return list.id === action.listId
                        ? {
                            ...list,
                            totalCount: action.totalCount,
                            tasks: !action.tasks ? [] 
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
        
        case TASK_IN_PROCESS:
            return {
                ...state,
                lists: state.lists.map((list) => {
                    if (list.id === action.listId) {
                        return {
                            ...list,
                            tasks: list.tasks.map( (task) => {
                                if (task.id === action.taskId) { 
                                    return {...task, [action.process]:action.value}
                                }
                                else return task
                            } )
                        }
                    }
                    else return list
                })
            }


// ------------------------ Filtered Tasks Reducers --------------------


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
                            totalCount: list.totalCount -1,
                            generalCount: list.generalCount -1,
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


// --------------------------- Lists Actions -----------------------------------

const RESTORE_LISTS = 'RESTORE-LISTS';
const restoreListsAC = (lists) => ({ type: RESTORE_LISTS, lists })

export const restoreLists = () => (dispatch) => {
    dispatch(listIsLoadingAC(true))
    api.restoreLists()
        .then( response => {
            dispatch(restoreListsAC(response.data));
            dispatch(listIsLoadingAC(false))
        })
}

const LIST_IS_LOADING = 'LIST_IS_LOADING'
const listIsLoadingAC = (value) => ({ type: LIST_IS_LOADING, value })

const ADD_LIST = 'ADD_LIST';
const addListAC = (list) => ({type: ADD_LIST, list})


export const addList = (title) => (dispatch) => {
    dispatch(listIsLoadingAC(true))
    api.addList(title)
            .then(Response => {
                dispatch(addListAC(Response.data.data.item))
                dispatch(listIsLoadingAC(false))
            })
}

const UPDATE_LIST_TITLE = 'UPDATE_LIST_TITLE';
const updateListTitleAC = (listId, title) => ({ type: UPDATE_LIST_TITLE, listId, title })

export const updateListTitle = (listId, title) => (dispatch) => {
    dispatch(listInProcessAC(listId, 'titleUpdating', true))
    api.updateListTitle(listId, title)
        .then(Response => {
            if (Response.data.resultCode === 0) {
                dispatch(updateListTitleAC(listId, title))
                dispatch(listInProcessAC(listId, 'titleUpdating', false))
            }
        })
}

const LIST_IN_PROCESS = 'LIST_IN_PROCESS'
const listInProcessAC = (listId, process, value) => ({type: LIST_IN_PROCESS, listId, process, value})

const DELETE_LIST = 'DELETE_LIST';
const deleteListAC = (listId) => ({type: DELETE_LIST, listId})

export const deleteList = (listId) => (dispatch) => {
    dispatch(listInProcessAC(listId, 'listDeliting', true))
    api.deleteList(listId)
            .then(() => {
                dispatch(deleteListAC(listId))
                dispatch(listInProcessAC(listId, 'listDeliting', false))
            })
}


const SET_FILTER_VALUE = 'SET_FILTER_VALUE'
const setFilterValueAC = (listId, value) => ({type: SET_FILTER_VALUE, listId, value})

export const setFilterValue = (listId, value) => async (dispatch) => {
    dispatch( setFilterValueAC(listId, value) )
}


// --------------------------- Tasks Actions -----------------------------------


const RESTORE_TASKS = 'RESTORE_TASKS';
const restoreTasksAC = (listId, tasks, totalCount) => ({ type: RESTORE_TASKS, listId, tasks, totalCount })

export const restoreTasks = (listId) => (dispatch) => {
    api.getTasks(listId)
            .then(Response => {
                dispatch(restoreTasksAC(listId, Response.data.items, Response.data.totalCount))
            })
}

const SET_TASKS_PAGE = 'SET_TASKS_PAGE';
export const setTasksPage = (listId, page, tasks, totalCount) =>
    ({ type: SET_TASKS_PAGE, listId, page, tasks, totalCount })


// set tasks page on "All" filter mode
export const setAllTasksPage = (listId, page) => (dispatch) => {
    return api.getTasksOnPage(listId, page)
        .then(Response => {
            const { items: tasks, totalCount } = Response.data;
            dispatch(setTasksPage(listId, page, tasks, totalCount))
        })
}


const DELETE_TASK = 'DELETE_TASK';
export const deleteTask = (listId, taskId, page) => ({ type: DELETE_TASK, listId, taskId, page })

const UPDATE_TASK = 'UPDATE_TASK';
export const updateTask = (task) => ({type: UPDATE_TASK, task })

const TASK_IN_PROCESS = 'TASK_IN_PROCESS'
const taskInProcessAC = (listId, taskId, process, value) => 
        ({type: TASK_IN_PROCESS, listId, taskId, process, value})

export const delTaskFromPage = (listId, taskId) => (dispatch, getState) => {
    
    // extract the target object from lists array & get all required parametrs
    const targetList = getState().lists.find( (item) => item.id === listId )
    const {page, filterValue, totalCount, countOnPage} = targetList
    const tasksLength = targetList.tasks.length
    const pagesCount = totalCount ? Math.ceil(totalCount/countOnPage) : 1
    
    dispatch( taskInProcessAC(listId,taskId, 'taskDeliting', true) )
    api.deleteTask(listId, taskId)
            .then((Response) => {
                if (Response.data.resultCode === 0) {
                    // delete task from not last page
                    if (tasksLength === 10 && page < pagesCount) {
                        if (filterValue === 'All') {
                            dispatch( setAllTasksPage(listId, page) )
                        } else {
                            const completed = filterValue === 'Completed' ? true : false
                            dispatch( setFilteredPage(listId, page, completed) )
                        }
                    }
                    // delete last task from not first page
                    if (tasksLength === 1 && page !== 1) {
                        if (filterValue === 'All') {
                            dispatch( setAllTasksPage(listId, page-1) )
                        } else {
                            const completed = filterValue === 'Completed' ? true : false
                            dispatch( setFilteredPage(listId, page - 1, completed) )
                        }

                    }
                    // delete last task from first page
                    if (tasksLength === 1 && page === 1 && filterValue !== 'All') {
                        dispatch( setAllTasksPage(listId, 1) )
                            .then(() => dispatch( setFilterValue('All') ) )
                    } 
                    // regular delete task case -> must be located at the end of chain
                    if (filterValue === 'All') {
                        dispatch( deleteTask(listId, taskId, page) )
                    } else {
                        dispatch( deleteFltrTask(listId, taskId, page) )
                    }
                }
            }).then( () => dispatch( taskInProcessAC(listId,taskId, 'taskDeliting', false) ) )
}


// ------------------------- Add Tasks Actions --------------------------

export const addTask = (listId, title) => (dispatch) => {
    dispatch(listInProcessAC(listId, 'taskIsAdding', true))
    return api.addTask(listId, title)
        .then((Response) => {
            if (Response.data.resultCode === 0) {
                dispatch(setAllTasksPage(listId, 1))
                    .then(() => {
                        dispatch(setFilterValue(listId, 'All'))
                        dispatch(listInProcessAC(listId, 'taskIsAdding', false))
                    })
            }
        })
}


export const addTaskActive = (listId, title) => (dispatch) => {
    dispatch( listInProcessAC(listId, 'taskIsAdding', true) )
    return api.addTask(listId, title)
        .then(Response => {
            if (Response.data.resultCode === 0) {
                api.getAllTasks(listId)
                    .then((Response) => {
                        const completed = false;
                        const tasks = Response.data.items;
                        dispatch( setFltrTasksPage(listId, 1, tasks, completed) )
                        dispatch( listInProcessAC(listId, 'taskIsAdding', false) )
                    })
            }
        })
}


// ------------------------ Filtered Tasks Actions ----------------------

const SET_FLTR_TASKS_PAGE = 'SET_FLTR_TASKS_PAGE';
export const setFltrTasksPage = (listId, page, tasks, completed) =>
    ({ type: SET_FLTR_TASKS_PAGE, listId, page, tasks, completed })

const DELETE_FLTR_TASK = 'DELETE_FLTR_TASK';
const deleteFltrTask = (listId, taskId, page) => ({ type: DELETE_FLTR_TASK, listId, taskId, page })

// set tasks page on "Active" or "Completed" filter mode
export const setFilteredPage = (listId, page, completed) => (dispatch) => {
    return api.getAllTasks(listId)
        .then(Response => {
            const tasks = Response.data.items;
            dispatch(setFltrTasksPage(listId, page, tasks, completed))
        })
}