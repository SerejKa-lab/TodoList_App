import {api} from '../API/api'

const initialState =  {
    lists: [],  
    listsOrder: [],
    listsProgress: { listsLoading: false },
    maxListsCount: 10
    /* lists: [
        {
            id: 0, title: 'Спорт', nextTaskId: 2, totalCount: 1, countOnPage: 10, filterValue: 'All',
            page: 1, titleUpdating: false, taskIsAdding: false, listDeliting: false, footerProcessing: false,
            tasks: [{ id: 1, title: 'CSS', status: 0, priority: 'medium', taskDeliting: false}]
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
                lists: action.lists.map( (list, index) => {
                    if (!list.tasks) return(
                        { ...list, order: index, page: 1, countOnPage, filterValue: 'All', tasks: [],
                            footerProcessing: false } 
                    )
                    else return (
                        { ...list, order: index, page: 1, countOnPage, filterValue: 'All',
                            footerProcessing: false }
                    )
                } ),
                listsOrder: action.lists.map( (list) => list.id )
            }

        case ADD_LIST:
            const extendedList = { ...action.list, page: 1, countOnPage, filterValue: 'All', tasks: [] };
            return {
                ...state,
                lists: [ ...state.lists, extendedList ].map((list, index) => ({...list, order: index}))
            }

        case UPDATE_LIST_TITLE:
            return {
                ...state,
                lists: state.lists.map( (list) => {
                    if (list.id === action.listId) return ({ ...list, title: action.title })
                    else return list
                } )
            }

        case REORDER_LIST:
            return {
                ...state,
                lists: action.reorderedLists.map( (list, index) => ({...list, order: index }) ),
                listsOrder: action.reorderedLists.map((list) => list.id)
            }

        case DELETE_LIST:
            return {
                ...state,
                lists: 
                    state.lists
                        .filter((list) => list.id !== action.listId)
                        .map( (list, index) => ({...list, order: index}) )  // change list order
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
            const totalCount = 
                action.tasks.filter((task) => task.status === action.status).length;
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
                                .filter((task) => task.status === action.status)
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

// ------------------------------ TEMPORARY ----------------------------------





// --------------------------- Lists Actions -----------------------------------


const LIST_IS_LOADING = 'LIST_IS_LOADING'
const listIsLoadingAC = (value) => ({ type: LIST_IS_LOADING, value })

const LIST_IN_PROCESS = 'LIST_IN_PROCESS'
const listInProcessAC = (listId, process, value) => {
    return({type: LIST_IN_PROCESS, listId, process, value})
}


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


const DELETE_LIST = 'DELETE_LIST';
const deleteListAC = (listId) => ({type: DELETE_LIST, listId})

export const deleteList = (listId) => (dispatch) => {
    dispatch(listInProcessAC(listId, 'listDeliting', true))
    return api.deleteList(listId)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(deleteListAC(listId))
                }
            }).then( () => dispatch(listInProcessAC(listId, 'listDeliting', false)) )
}



const REORDER_LIST = 'REORDER_LIST'
export const reorderListAC = (reorderedLists) => ({type: REORDER_LIST, reorderedLists })

export const reorderList = (listId, currPos, nextOrdNumb) => (dispatch, getState) => {
    
    const nextPos = nextOrdNumb !== ( null || undefined ) ? +nextOrdNumb - 1 : null   //define next element position
   
    const getAfterId = () => {
        // if nextOrdNumb undefined or null element position should'n change
        // this is insurence check or for case of using reorderListAC
        if (nextPos === null && currPos === 0) return null
        if (nextPos === null) return getState().listsOrder[currPos-1]
        
        // if next position defined find 'put after element' Id
        if (nextPos === 0) return null
        if (nextPos <= +currPos) return getState().listsOrder[nextPos-1]
        if (nextPos > +currPos) return getState().listsOrder[nextPos]
    }
    
    const getReorderedLists = () => {
        const lists = [...getState().lists]
        if (nextPos < currPos) {
            const currList = lists[currPos]
            for (let i = currPos-1; i >= nextPos; i--) {
                lists[i+1] = lists[i]
            }
            lists[nextPos] = currList
            return lists
        }
        if (nextPos > currPos) {
            const currList = lists[currPos]
            for (let i = currPos; i < nextPos; i++) {
                lists[i] = lists[i+1]
            }
            lists[nextPos] = currList
            return lists
        }
        return lists    // default value for unchanged lists ---> insurance check
    }

    if ( nextPos !== null && nextPos !== +currPos ) {
        const putAfterItemId = getAfterId()              // get putAfterItemId for API request
        const reorderedLists = getReorderedLists()       // get reordered lists for dispatch

        dispatch(listIsLoadingAC(true))
        api.reorderList(listId, putAfterItemId)
            .then((response) => {
                if (response.data.resultCode === 0) {
                    dispatch(reorderListAC(reorderedLists))
                    dispatch(listIsLoadingAC(false))
                }
            })
    }
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
export const setTasksPageAC = (listId, page, tasks, totalCount) =>
    ({ type: SET_TASKS_PAGE, listId, page, tasks, totalCount })

const DELETE_TASK = 'DELETE_TASK';
export const deleteTask = (listId, taskId, page) => ({ type: DELETE_TASK, listId, taskId, page })

const UPDATE_TASK = 'UPDATE_TASK';
const updateTaskAC = (task) => ({type: UPDATE_TASK, task })

const TASK_IN_PROCESS = 'TASK_IN_PROCESS'
const taskInProcessAC = (listId, taskId, process, value) => 
        ({type: TASK_IN_PROCESS, listId, taskId, process, value})


// ------------------------ Filtered Tasks Actions ----------------------



const SET_FILTER_VALUE = 'SET_FILTER_VALUE'
const setFilterValueAC = (listId, value) => ({type: SET_FILTER_VALUE, listId, value})

export const setFilterValue = (listId, filterValue) => (dispatch) => {
    dispatch( setFilterValueAC(listId, filterValue) )
    dispatch(setTasksPage(listId, filterValue, 1))
}


const SET_FLTR_TASKS_PAGE = 'SET_FLTR_TASKS_PAGE';
export const setFltrTasksPage = (listId, page, tasks, status) =>
    ({ type: SET_FLTR_TASKS_PAGE, listId, page, tasks, status })

const DELETE_FLTR_TASK = 'DELETE_FLTR_TASK';
const deleteFltrTask = (listId, taskId, page) => ({ type: DELETE_FLTR_TASK, listId, taskId, page })



// set tasks page on "Active" or "Completed" filter mode
const setFilteredPage = (listId, page, status) => (dispatch) => {
    return api.getAllTasks(listId)
        .then(Response => {
            const tasks = Response.data.items;
            dispatch(setFltrTasksPage(listId, page, tasks, status))
        })
}

// set tasks page on "All" filter mode
const setAllTasksPage = (listId, page) => (dispatch) => {
    return api.getTasksOnPage(listId, page)
        .then(Response => {
            const { items: tasks, totalCount } = Response.data;
            dispatch(setTasksPageAC(listId, page, tasks, totalCount))
        })
}


export const setTasksPage = (listId, filterValue, page) => (dispatch) => {
    
    dispatch( listInProcessAC(listId, 'footerProcessing', true) )

    switch (filterValue) {
        
        case 'Active':
            dispatch(setFilteredPage(listId, page, 0))   // status = 0
                .then(() => dispatch(listInProcessAC(listId, 'footerProcessing', false)))
        break

        case 'Completed':
            dispatch(setFilteredPage(listId, page, 1))   // status = 1
                .then(() => dispatch(listInProcessAC(listId, 'footerProcessing', false)))
        break

        default:
            dispatch(setAllTasksPage(listId, page))
                .then(() => dispatch(listInProcessAC(listId, 'footerProcessing', false)))
    }
}


export const addTask = (listId, title) => (dispatch) => {
    dispatch(listInProcessAC(listId, 'taskIsAdding', true))
    return api.addTask(listId, title)
        .then((Response) => {
            if (Response.data.resultCode === 0) {
                dispatch(setAllTasksPage(listId, 1))
                    .then(() => {
                        dispatch(setFilterValueAC(listId, 'All'))
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
                        const status = 0;
                        const tasks = Response.data.items;
                        dispatch( setFltrTasksPage(listId, 1, tasks, status) )
                        dispatch( listInProcessAC(listId, 'taskIsAdding', false) )
                    })
            }
        })
}

export const delTaskFromPage = (listId, taskId) => (dispatch, getState) => {
    
    // extract the target object from lists array & get all required parametrs
    const targetList = getState().lists.find( (item) => item.id === listId )
    const {page, filterValue, totalCount, countOnPage} = targetList
    const tasksLength = targetList.tasks.length
    const pagesCount = totalCount ? Math.ceil(totalCount/countOnPage) : 1
    
    dispatch( taskInProcessAC(listId,taskId, 'taskInProcess', true) )
    api.deleteTask(listId, taskId)
            .then((Response) => {
                if (Response.data.resultCode === 0) {
                    // delete task from not last page
                    if (tasksLength === 10 && page < pagesCount) {
                        if (filterValue === 'All') {
                            dispatch( setAllTasksPage(listId, page) )
                        } else {
                            const status = filterValue === 'Completed' ? 1 : 0
                            dispatch( setFilteredPage(listId, page, status) )
                        }
                    } 
                    // delete last task from not first page
                    if (tasksLength === 1 && page !== 1) {
                        if (filterValue === 'All') {
                            dispatch( setAllTasksPage(listId, page-1) )
                        } else {
                            const status = filterValue === 'Completed' ? 1 : 0
                            dispatch( setFilteredPage(listId, page - 1, status) )
                        }

                    }
                    // delete last task from first page
                    if (tasksLength === 1 && page === 1 && filterValue !== 'All') {
                        dispatch( setAllTasksPage(listId, 1) )
                            .then(() => dispatch( setFilterValueAC(listId, 'All') ) )
                    }
                    // regular delete task case -> must be located at the end of chain
                    if (filterValue === 'All') {
                        dispatch( deleteTask(listId, taskId, page) )
                    } else {
                        dispatch( deleteFltrTask(listId, taskId, page) )
                    }
                }
            }).then( () => dispatch( taskInProcessAC(listId,taskId, 'taskInProcess', false) ) )
}


export const updateTask = (listId, taskId, updateObj) => (dispatch, getState) => {

    // extract the target object from lists array & get all required parametrs
    const targetList = getState().lists.find( (item) => item.id === listId )
    const { page, filterValue } = targetList
    const tasksLength = targetList.tasks.length
    const targetTask = targetList.tasks.find( (item) => item.id === taskId )
    const updatedTask = { ...targetTask, ...updateObj }
    
    dispatch( taskInProcessAC(listId,taskId, 'taskInProcess', true) )
  
    api.updateTask(listId, taskId, updatedTask)
        .then(Response => {
            if (Response.data.resultCode === 0) {
                if (filterValue === 'All') {
                    dispatch(updateTaskAC(Response.data.data.item))
                } else {
                    api.getAllTasks(listId)
                        .then((Response) => {
                            if (!Response.data.error) {
                                const tasks = Response.data.items;
                                const status = filterValue === 'Completed' ? 1 : 0
                                // set previous filtered page
                                if (tasksLength === 1 && page !== 1 && updateObj.status !== undefined) {
                                    dispatch(setFltrTasksPage(listId, page - 1, tasks, status))
                                } else if (tasksLength === 1 && page === 1 && updateObj.status !== undefined) {
                                        dispatch(setAllTasksPage(listId, 1))
                                        dispatch(setFilterValueAC(listId, 'All'))
                                } else
                                    dispatch(setFltrTasksPage(listId, page, tasks, status))
                            }
                        })
                }
            }
        }).then( () => dispatch( taskInProcessAC(listId,taskId, 'taskInProcess', false) ) )
}