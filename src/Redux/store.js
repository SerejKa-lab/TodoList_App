import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ThunkMiddleware from 'redux-thunk';
import reducer from './reducer';


const store = createStore(reducer, composeWithDevTools(applyMiddleware(ThunkMiddleware)));

export default store;