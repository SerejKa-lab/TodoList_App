import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';


const initialState = {
    nextListId: 1,
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
        

        default: return state;
    }

}


const store = createStore( reducer, composeWithDevTools() );

export default store;