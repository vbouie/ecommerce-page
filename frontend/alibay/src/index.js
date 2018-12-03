import React from 'react';
import ReactDOM from 'react-dom';
import {connect, Provider } from 'react-redux/src';
import {createStore } from 'redux'
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorker from './serviceWorker';


let reducer = function (state, action) {
    if(action.type === 'putSearchResults') {
        return {...state, searchResults: action.res  }
    }
    return state
}
let store = createStore(
    reducer, 
    {searchResults: []},
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
let body = (<Provider store ={store}>
  <App />
</Provider>)
   
ReactDOM.render(body, document.getElementById('root'));

serviceWorker.unregister();