import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';


const initialState = {
    nextListId: 2,
    lists: 
        [{ id: 0, title:  'Спорт',  nextTaskId: 2, tasks: [{ id: 1, title: 'CSS', isDone: false, priority: 'medium' }] },
         { id: 1, title:  'Спорт',  nextTaskId: 2, tasks: [{ id: 1, title: 'CSS', isDone: false, priority: 'medium' }] }
        ] 
};


const reducer = (state = initialState, action) => {

    switch (action.type) {

        case 'ADD-LIST':
            const listId = state.lists.length === 0 ? 0 : state.nextListId;
            const newList = { id: listId, title: action.listTitle, tasks: [], nextTaskId: 1 };
            return { 
                ...state,
                lists: [...state.lists, newList], 
                nextListId: listId + 1 
            }
        
        case 'DELETE-LIST':
            return {
                ...state,
                lists: state.lists.filter( (list) => list.id !== action.listId )
            }
            
        case 'ADD-TASK':
            const taskId = state.lists[action.listId].tasks.length + 1;
            const newTask = { id: taskId, title: action.taskTitle, isDone: false, priority:'medium' }
            return {
                ...state,
                lists: state.lists.map( (list) => {
                    if (list.id === action.listId) {
                        return {
                            ...list,
                            nextTaskId: list.nextTaskId + 1,
                            tasks: [ ...list.tasks, newTask ]
                        }
                    } else return list;
                    
                } )
            }

        case 'DELETE-TASK':
            return {
                ...state,
                lists: state.lists.map( (list) => {
                    if (list.id === action.listId) {
                        return {
                            ...list,
                            tasks: 
                                list.tasks.filter( (task) => task.id !== action.taskId )
                                    .map( (task, index) => ({ ...task, id: index+1 }) )
                                    // получаю список заданий с номерами по порядку
                        }
                    } else return list
                } )
            }
        

        default: return state;
    }

}


const store = createStore( reducer, composeWithDevTools() );

export default store;