
const initialState =  {
        lists: []
        //lists: [{id: 0, title: 'Спорт', nextTaskId: 2, tasks: [{ id: 1, title: 'CSS', isDone: false, priority: 'medium' }]  }]
    };


const reducer = (state = initialState, action) => {

    switch (action.type) {

        case RESTORE_LISTS:
            return {
                ...state,
                lists: action.lists.map( (list) => {
                    return !list.tasks
                        ? { ...list, tasks: [] } 
                        : list
                } )
            }

        case ADD_LIST:
            const extendedList = { ...action.list, tasks: [] };
            return {
                ...state,
                lists: [ extendedList, ...state.lists ]
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
                            tasks: !action.tasks 
                                ? [] 
                                : action.tasks.map( (task, index) => ({...task, renderIndex: index + 1 }) )
                        }
                        : list
                })
            }

        case ADD_TASK:
            return {
                ...state,
                lists: state.lists.map((list) => {
                    if (list.id === action.task.todoListId) {
                        return {
                            ...list,
                            tasks: [ action.task, ...list.tasks ]
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
                            tasks:
                                list.tasks.filter((task) => task.id !== action.taskId)
                        }
                    } else return list
                })
            }

        case UPDATE_TASK:

            const getNewPriorityObj = () => {
                switch (action.dataObj.priority) {
                    case 'high':
                        return ({ priority: 'low' })
                    case 'low':
                        return ({ priority: 'medium' })
                    default:
                        return ({ priority: 'high' })
                }
            }

            const newData = action.dataObj['priority'] === undefined ? action.dataObj : getNewPriorityObj();

            return {
                ...state,
                lists: state.lists.map((list) => {
                    if (list.id === action.listId) {
                        return {
                            ...list,
                            tasks: list.tasks.map((task) => {
                                if (task.id === action.taskId) {
                                    return { ...task, ...newData }
                                } else return task
                            })
                        }
                    } else return list;
                })
            }

        default: return state;
    }

}

export default reducer;

const  RESTORE_LISTS = 'RESTORE-LISTS';
export const restoreLists = (lists) => ({ type: RESTORE_LISTS, lists })

const ADD_LIST = 'ADD-LIST';
export const addList = (list) => ({type: ADD_LIST, list})

const DELETE_LIST = 'DELETE-LIST';
export const deleteList = (listId) => ({type: DELETE_LIST, listId})

const RESTORE_TASKS = 'RESTORE_TASKS';
export const restoreTasks = (listId, tasks) => ({ type: RESTORE_TASKS, listId, tasks })

const ADD_TASK = 'ADD-TASK';
export const addTask = (task) => ({type: ADD_TASK, task})

const DELETE_TASK = 'DELETE-TASK';
export const deleteTask = (listId, taskId) => ({type: DELETE_TASK, listId, taskId})

const UPDATE_TASK = 'UPDATE-TASK';
export const updateTask = (listId, taskId, dataObj) => ({type: UPDATE_TASK, listId, taskId, dataObj})