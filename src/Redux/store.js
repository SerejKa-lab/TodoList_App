import { createStore, combineReducers ,applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ThunkMiddleware from 'redux-thunk';
import reducer from './reducer';
import errorsReducer from './errorsReducer';


const storeReducer = combineReducers({
    app: reducer,
    errors: errorsReducer
})


const store = createStore(storeReducer, composeWithDevTools(applyMiddleware(ThunkMiddleware)));

export default store;