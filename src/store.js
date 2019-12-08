import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './reducer';


const store = createStore(reducer, composeWithDevTools());

export default store;

export const API_KEY = '5deaa5a9-bfea-4e80-bac8-d313181506e0';