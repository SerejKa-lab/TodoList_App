import {api} from '../API/api'
import { setErrorAC } from './errorsReducer';

const initialState =  {
    lists: [],  
    listsOrder: [],
    listsProgress: { listsLoading: false },
    maxTasksCount: 33,
    maxListsCount: 10,
    error: null
    /* lists: [
        {
            id: 0, title: 'Спорт', nextTaskId: 2, totalCount: 1, countOnPage: 10, filterValue: ALL_S,
            page: 1, titleUpdating: false, taskIsAdding: false, listDeliting: false, footerProcessing: false,
            tasksOrder: [], prevActiveID: 'some_id'
            tasks: [{ id: 1, title: 'CSS', status: 0, priority: 'Middle', taskDeliting: false}]
        }
    ] */
    };


const appReducer = (state = initialState, action) => {

    const countOnPage = 10;
    const renderBasis = (action.page - 1)*countOnPage +1;

    switch (action.type) {

  // ---------------------------List Reducers -------------------------------
        
        case RESTORE_LISTS:
            return {
                ...state,
                lists: action.lists.map( (list, index) => {
                    if (!list.tasks) return(
                        { ...list, order: index, page: 1, countOnPage, filterValue: ALL_S, tasks: [],
                            footerProcessing: false } 
                    )
                    else return (
                        { ...list, order: index, page: 1, countOnPage, filterValue: ALL_S,
                            footerProcessing: false }
                    )
                } ),
                listsOrder: action.lists.map( (list) => list.id )
            }

        case ADD_LIST:
            const extendedList = { ...action.list, page: 1, countOnPage, filterValue: ALL_S, tasks: [] };
            return {
                ...state,
                lists: [ extendedList, ...state.lists ].map((list, index) => ({...list, order: index}))
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
                   if (list.id === action.listId)
                        return {
                            ...list,
                            totalCount: action.totalCount,
                            tasksOrder: !action.tasks ? [] 
                                : action.tasks.map((task) => task.id),
                            tasks: !action.tasks ? [] 
                                : action.tasks.filter( (task, index) => index < countOnPage )
                                    .map( (task, index) => ({...task, renderIndex: index + 1 }) )
                        }
                    else return list
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

        case SET_TASKS_ORDER:
            return {
                ...state,
                lists: state.lists.map((list) => {
                    if (list.id === action.listId) {
                        return { ...list, tasksOrder: action.tasksOrder }
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
                            tasksOrder: list.tasksOrder.filter((id) => id !== action.taskId),
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
            const totalCount =          // get tasks count on filtered page
                action.tasks.filter((task) => task.status === action.status).length;
            const newTasksOrder = action.tasks
                .filter((task) => task.status === action.status)
                .map((task) => task.id)
            return {
                ...state,
                lists: state.lists.map((list) => {
                    if (list.id === action.listId) {
                        return {
                            ...list,
                            page: action.page,
                            totalCount, 
                            generalCount: action.tasks.length,  // general tasks count
                            tasksOrder: newTasksOrder,
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
                            tasksOrder: list.tasksOrder.filter((id) => id !== action.taskId) ,
                            tasks: list.tasks.filter((task) => task.id !== action.taskId)
                                .map((task, index) => ({ ...task, renderIndex: renderBasis + index }))
                        }
                    } else return list
                })
            }

        case SET_PREV_ACT_ID:
            return {
                ...state,
                lists: state.lists.map((list) => {
                    if (list.id === action.listId) {
                        return {
                            ...list,
                            prevActiveId: action.prevActiveId
                        }
                    } else return list
                })
            }

            
        default: return state;
    }

}

export default appReducer;

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

export const restoreLists = () => async(dispatch) => {
    try {
        dispatch(listIsLoadingAC(true))
        const response = await api.restoreLists()
        dispatch(restoreListsAC(response.data));
        dispatch(listIsLoadingAC(false))
    } catch (error) {
        dispatch(setErrorAC(error))
        dispatch(listIsLoadingAC(false))
    }
}


const ADD_LIST = 'ADD_LIST';
const addListAC = (list) => ({type: ADD_LIST, list})

export const addList = (title) => async(dispatch) => {
    try {
        dispatch(listIsLoadingAC(true))
        const response = await api.addList(title)
        dispatch(addListAC(response.data.data.item))
        dispatch(listIsLoadingAC(false))
    } catch (error) {
        dispatch(setErrorAC(error))
        dispatch(listIsLoadingAC(false))
    }
}

const UPDATE_LIST_TITLE = 'UPDATE_LIST_TITLE';
const updateListTitleAC = (listId, title) => ({ type: UPDATE_LIST_TITLE, listId, title })

export const updateListTitle = (listId, title) => async(dispatch) => {
    try {
        dispatch(listInProcessAC(listId, 'titleUpdating', true))
        const response = await api.updateListTitle(listId, title)
        if (response.data.resultCode === 0) {
            dispatch(updateListTitleAC(listId, title))
            dispatch(listInProcessAC(listId, 'titleUpdating', false))
        }
    } catch (error) {
        dispatch(setErrorAC(error))
        dispatch(listInProcessAC(listId, 'titleUpdating', false))
    }
}


const DELETE_LIST = 'DELETE_LIST';
const deleteListAC = (listId) => ({type: DELETE_LIST, listId})

export const deleteList = (listId) => async(dispatch) => {
    try {
        dispatch(listInProcessAC(listId, 'listDeliting', true))
        const response = await api.deleteList(listId)
        if (response.data.resultCode === 0) {
            await dispatch(deleteListAC(listId))
        }
        dispatch(listInProcessAC(listId, 'listDeliting', false))
        
    } catch (error) {
        dispatch(setErrorAC(error))
        dispatch(listInProcessAC(listId, 'listDeliting', false))
    }
}


const REORDER_LIST = 'REORDER_LIST'
const reorderListAC = (reorderedLists) => ({type: REORDER_LIST, reorderedLists })

export const reorderList = (listId, currPos, nextRenderPos) => async(dispatch, getState) => {
    
    const nextPos = nextRenderPos !== ( null || undefined ) ? +nextRenderPos - 1 : null   //define next element position
   
    const getAfterId = () => {
        // if nextRenderPos undefined or null element position should'n change
        // this is insurence check or for case of using reorderListAC
        if (nextPos === null && currPos === 0) return null
        if (nextPos === null) return getState().app.listsOrder[currPos-1]
        
        // if next position defined find 'put after element' Id
        if (nextPos === 0) return null
        if (nextPos <= +currPos) return getState().app.listsOrder[nextPos-1]
        if (nextPos > +currPos) return getState().app.listsOrder[nextPos]
    }
    
    const getReorderedLists = () => {
        const lists = [...getState().app.lists]
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

        try {
            dispatch(listIsLoadingAC(true))
            const response = await api.reorderList(listId, putAfterItemId)
            if (response.data.resultCode === 0) {
                dispatch(reorderListAC(reorderedLists))
                dispatch(listIsLoadingAC(false))
            }
        } catch (error) {
            dispatch(setErrorAC(error))
            dispatch(listIsLoadingAC(false))
        }
    }
}


// --------------------------- Tasks Actions -----------------------------------


const RESTORE_TASKS = 'RESTORE_TASKS';
const restoreTasksAC = (listId, tasks, totalCount) => ({ type: RESTORE_TASKS, listId, tasks, totalCount })

export const restoreTasks = (listId) => async(dispatch) => {
    try {
        const response = await api.getAllTasks(listId)
        dispatch(restoreTasksAC(listId, response.data.items, response.data.totalCount))
    } catch (error) {
        dispatch(setErrorAC(error))
    }
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


// status filter values
export const ALL_S = 'ALL_S'
export const COMPLETED = 'COMPLETED'
export const ACTIVE = 'ACTIVE'

export const statusObj = {completed: 1, active: 0}


const SET_FILTER_VALUE = 'SET_FILTER_VALUE'
const setFilterValueAC = (listId, value) => ({type: SET_FILTER_VALUE, listId, value})

export const setFilterValue = (listId, filterValue) => (dispatch, getState) => {
    
    // get tasks id before the first completed task in list and save it to state
    // for reorderTasks in case of filterValue === COMPLETED
    const targetList = getState().app.lists.find((l) => l.id === listId)
    const currFilter = targetList.filterValue

    if (currFilter !== COMPLETED) {
        const firstComplInd = targetList.tasks.findIndex((t) => t.status === statusObj.completed)
        const prevActiveId = (firstComplInd === 0 || targetList.tasks.length === 0)
            ? null
            : targetList.tasks[0].id
        dispatch(setPrevActId(listId, prevActiveId))
    }
    // <-----
    
    dispatch(setTasksPage(listId, filterValue, 1))  
    // !!! dispatch(setTasksPage(...)) must be called before dispatch(setFelterValueAC(...))
    // to get correct current filterValue in setAllTasksPage call
    
    dispatch( setFilterValueAC(listId, filterValue) )
}


const SET_PREV_ACT_ID = 'SET_PREV_ACT_ID'
const setPrevActId = (listId, prevActiveId) => ({type: SET_PREV_ACT_ID, listId, prevActiveId})

const SET_FLTR_TASKS_PAGE = 'SET_FLTR_TASKS_PAGE';
const setFilteredPageAC = (listId, page, tasks, status) =>
    ({ type: SET_FLTR_TASKS_PAGE, listId, page, tasks, status })

const DELETE_FLTR_TASK = 'DELETE_FLTR_TASK';
const deleteFltrTask = (listId, taskId, page) => ({ type: DELETE_FLTR_TASK, listId, taskId, page })



// set tasks page on "Active" or "Completed" filter mode
const setFilteredPage = (listId, page, status) => async(dispatch) => {
    try {
        const response = await api.getAllTasks(listId)
        const tasks = response.data.items;
        dispatch(setFilteredPageAC(listId, page, tasks, status))
    } catch (error) {
        dispatch(setErrorAC(error))
    }
}

// set tasks page on "All" filter mode
const setAllTasksPage = (listId, page) => async(dispatch, getState) => {
    
    //  get previous filterValue
    const { filterValue: prevFilterVal } = getState().app.lists.find((list) => list.id === listId)

    switch (prevFilterVal) {

        // if previous filter was 'Active' or 'Completed' --> set new tasksOrder
        case COMPLETED:
        case ACTIVE:
            try {
                const response_1 = await api.getAllTasks(listId)
                const newTasksOrder = response_1.data.items.map((task) => task.id)
                dispatch(setTasksOrder(listId, newTasksOrder))
                
                const response_2 = await api.getTasksOnPage(listId, page)
                const { items: tasks, totalCount } = response_2.data;
                dispatch(setTasksPageAC(listId, page, tasks, totalCount))
                break
            } catch (error) {
                dispatch(setErrorAC(error))
                break
            }


        default:      // case previous filterValue === ALL_S
            try {
                const response = await api.getTasksOnPage(listId, page)
                const { items: tasks, totalCount } = response.data;
                dispatch(setTasksPageAC(listId, page, tasks, totalCount))
            } catch (error) {
                dispatch(setErrorAC(error))
            }
    }
}


export const setTasksPage = (listId, filterValue, page) => async(dispatch) => {
    
    dispatch( listInProcessAC(listId, 'footerProcessing', true) )

    let status = statusObj.active
    switch (filterValue) {
        
        case ACTIVE:
            await dispatch(setFilteredPage(listId, page, status))
            dispatch(listInProcessAC(listId, 'footerProcessing', false))
        break

        case COMPLETED:
            status = statusObj.completed
            await dispatch(setFilteredPage(listId, page, status))
            dispatch(listInProcessAC(listId, 'footerProcessing', false))
        break

        default:    //case filterValue === ALL_S
            await dispatch(setAllTasksPage(listId, page))
            dispatch(listInProcessAC(listId, 'footerProcessing', false))
    }
}


export const addTask = (listId, title) => async(dispatch, getState) => {

    // get current tasksOrder
    const tasksOrder = getState().app.lists.find((list) => list.id === listId).tasksOrder

    dispatch(listInProcessAC(listId, 'taskIsAdding', true))
    try {
        const response = await api.addTask(listId, title)
        if (response.data.resultCode === 0) {
            const newTaskId = response.data.data.item.id
            const newTasksOrder = [newTaskId, ...tasksOrder]
            dispatch(setTasksOrder(listId, newTasksOrder))
            await dispatch(setAllTasksPage(listId, 1))
            dispatch(setFilterValueAC(listId, ALL_S))
            dispatch(listInProcessAC(listId, 'taskIsAdding', false))
        }
    } catch (error) {
        dispatch(setErrorAC(error))
        dispatch(listInProcessAC(listId, 'taskIsAdding', false))
    }
}


export const addTaskActive = (listId, title) => async(dispatch, getState) => {

    // get current tasksOrder
    const tasksOrder = getState().app.lists.find((list) => list.id === listId).tasksOrder

    dispatch( listInProcessAC(listId, 'taskIsAdding', true) )
    try {
        const response_1 = await api.addTask(listId, title)
        if (response_1.data.resultCode === 0) {
            const newTaskId = response_1.data.data.item.id
            const newTasksOrder = [newTaskId, ...tasksOrder]
            dispatch(setTasksOrder(listId, newTasksOrder))
            const response_2 = await api.getAllTasks(listId)
            const status = statusObj.active
            const tasks = response_2.data.items;
            dispatch(setFilteredPageAC(listId, 1, tasks, status))
            dispatch(listInProcessAC(listId, 'taskIsAdding', false))
        }
    } catch (error) {
        dispatch(setErrorAC(error))
        dispatch(listInProcessAC(listId, 'taskIsAdding', false))
    }
}

export const delTaskFromPage = (listId, taskId) => async(dispatch, getState) => {
    
    // extract the target object from lists array & get all required parametrs
    const targetList = getState().app.lists.find( (item) => item.id === listId )
    const {page, filterValue, totalCount, countOnPage} = targetList
    const tasksLength = targetList.tasks.length
    const pagesCount = totalCount ? Math.ceil(totalCount/countOnPage) : 1
    
    dispatch( taskInProcessAC(listId,taskId, 'taskInProcess', true) )
    try {
        const response = await api.deleteTask(listId, taskId)
        if (response.data.resultCode === 0) {
            // delete task from not last page
            if (tasksLength === 10 && page < pagesCount) {
                if (filterValue === ALL_S) {
                    await dispatch(setAllTasksPage(listId, page))
                } else {
                    const status = filterValue === COMPLETED
                        ? statusObj.completed
                        : statusObj.active
                    await dispatch(setFilteredPage(listId, page, status))
                }
            }
            // delete last task from not first page
            if (tasksLength === 1 && page !== 1) {
                if (filterValue === ALL_S) {
                    await dispatch(setAllTasksPage(listId, page - 1))
                } else {
                    const status = filterValue === COMPLETED
                        ? statusObj.completed
                        : statusObj.active
                    await dispatch(setFilteredPage(listId, page - 1, status))
                }

            }
            // delete last task from first page
            if (tasksLength === 1 && page === 1 && filterValue !== ALL_S) {
                await dispatch(setAllTasksPage(listId, 1))
                dispatch(setFilterValueAC(listId, ALL_S))
            }
            // regular delete task case -> must be located at the end of chain
            if (filterValue === ALL_S) {
                await dispatch(deleteTask(listId, taskId, page))
            } else {
                await dispatch(deleteFltrTask(listId, taskId, page))
            }
        }
            dispatch(taskInProcessAC(listId, taskId, 'taskInProcess', false))
    } catch(error) {
        dispatch(setErrorAC(error))
        dispatch(taskInProcessAC(listId, taskId, 'taskInProcess', false))
    }
}


export const updateTask = (listId, taskId, updateObj) => async(dispatch, getState) => {

    // extract the target object from lists array & get all required parametrs
    const targetList = getState().app.lists.find( (item) => item.id === listId )
    const { page, filterValue } = targetList
    const tasksLength = targetList.tasks.length
    const targetTask = targetList.tasks.find( (item) => item.id === taskId )
    const updatedTask = { ...targetTask, ...updateObj }
    
    dispatch( taskInProcessAC(listId,taskId, 'taskInProcess', true) )
  
    try {
        const response_1 = await api.updateTask(listId, taskId, updatedTask)
        if (response_1.data.resultCode === 0) {
            if (filterValue === ALL_S) {
                dispatch(updateTaskAC(response_1.data.data.item))
            } else {
                const response_2 = await api.getAllTasks(listId)
                if (!response_2.data.error) {
                    const tasks = response_2.data.items;
                    const status = filterValue === COMPLETED
                        ? statusObj.completed
                        : statusObj.active
                    // set previous filtered page
                    if (tasksLength === 1 && page !== 1 && updateObj.status !== undefined) {
                        dispatch(setFilteredPageAC(listId, page - 1, tasks, status))
                    } else if (tasksLength === 1 && page === 1 && updateObj.status !== undefined) {
                        await dispatch(setAllTasksPage(listId, 1))
                        dispatch(setFilterValueAC(listId, ALL_S))
                    } else
                        dispatch(setFilteredPageAC(listId, page, tasks, status))
                }
            }
        }
        dispatch(taskInProcessAC(listId, taskId, 'taskInProcess', false))
    } catch (error) {
        dispatch(setErrorAC(error))
        dispatch(taskInProcessAC(listId, taskId, 'taskInProcess', false))
    }
}


const SET_TASKS_ORDER = 'SET_TASKS_ORDER'
const setTasksOrder = (listId, tasksOrder) => ({ type: SET_TASKS_ORDER, listId, tasksOrder })


export const reorderTask = (listId, taskId, currPos, nextRenderPos) => async(dispatch, getState) => {

    const nextPos = nextRenderPos !== (null || undefined) ? +nextRenderPos - 1 : null   //define next element position
    const targerList = getState().app.lists.find((list) => list.id === listId)

    const getAfterId = () => {
        const { filterValue, prevActiveId } = targerList
        // if nextRenderPos undefined or null element position should'n change
        // this is insurence check or for case of using reorderTaskAC
        if (nextPos === null && currPos === 0) return null
        if (nextPos === null) return targerList.tasksOrder[currPos - 1]

        // if next position defined find 'put after element' Id
        if (filterValue === COMPLETED && nextPos === 0) return prevActiveId
        if (nextPos === 0) return null
        if (nextPos <= +currPos) return targerList.tasksOrder[nextPos - 1]
        if (nextPos > +currPos) return targerList.tasksOrder[nextPos]
    }

    const getTasksOrder = () => {
        const tasksOrder = [...targerList.tasksOrder]
        if (nextPos < currPos) {
            const currId = tasksOrder[currPos]
            for (let i = currPos - 1; i >= nextPos; i--) {
                tasksOrder[i + 1] = tasksOrder[i]
            }
            tasksOrder[nextPos] = currId
            return tasksOrder
        }
        if (nextPos > currPos) {
            const currId = tasksOrder[currPos]
            for (let i = currPos; i < nextPos; i++) {
                tasksOrder[i] = tasksOrder[i + 1]
            }
            tasksOrder[nextPos] = currId
            return tasksOrder
        }
        return tasksOrder    // default value for unchanged lists ---> insurance check
    }


    // reorder functional block
    if (nextPos !== null && nextPos !== +currPos) {
        const putAfterItemId = getAfterId()              // get putAfterItemId for API request
        const { countOnPage, filterValue } = targerList
        // determine status of filtered tasks for dispatch(setFilteredPage(...))
        const { status } = targerList.tasks.find((t) => t.id === taskId )
        const tasksOrder = getTasksOrder()               // determine new tasksOrder

        const page = nextRenderPos ? Math.ceil(nextRenderPos / countOnPage) : 1
        // determine which page will appear on after the reorder

        dispatch(listInProcessAC(listId, 'taskIsAdding', true))
        try {
            const response = await api.reorderTask(listId, taskId, putAfterItemId)
            if (response.data.resultCode === 0) {
                if (filterValue === ALL_S) {
                    await dispatch(setAllTasksPage(listId, page))
                    dispatch(setTasksOrder(listId, tasksOrder))
                    dispatch(listInProcessAC(listId, 'taskIsAdding', false))
                }
                if (filterValue === ACTIVE || filterValue === COMPLETED) {
                    await dispatch(setFilteredPage(listId, page, status))
                    // dispatch(setTasksOrder(listId, tasksOrder))
                    dispatch(listInProcessAC(listId, 'taskIsAdding', false))
                }
            }
        } catch (error) {
            dispatch(setErrorAC(error))
            dispatch(listInProcessAC(listId, 'taskIsAdding', false))
        }
    }
}