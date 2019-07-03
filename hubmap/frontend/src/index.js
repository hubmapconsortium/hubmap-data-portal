import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reducer from './middleware/rootReducer'
import thunk from 'redux-thunk';
import runtime from 'serviceworker-webpack-plugin/lib/runtime';

export const store = createStore(reducer, applyMiddleware(thunk));
console.log(store.getState());
if (typeof window !== 'undefined') {
ReactDOM.render(
	<Provider store={store}><App /></Provider>,
	document.getElementById('root')
);
}
//module.hot.accept();
if ('serviceWorker' in navigator) {
	window.addEventListener('load', function() {
	  navigator.serviceWorker.register('/service-worker.js');
	});
  } 
