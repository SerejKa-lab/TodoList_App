import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import App from './UI/App';
import store from './Redux/store';


ReactDOM.render(
    <HashRouter>
        <Provider store = {store}>
            <App />
        </Provider>
    </HashRouter>, document.getElementById('root'));


