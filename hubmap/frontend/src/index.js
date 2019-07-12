import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import "babel-polyfill";
//import runtime from 'serviceworker-webpack-plugin/lib/runtime';

console.log(store.getState());
//if (typeof window !== 'undefined') {
ReactDOM.render(
	<App />,
	document.getElementById('root')
);
//}
module.hot.accept();
serviceWorker.unregister();
if ('serviceWorker' in navigator) {
	window.addEventListener('load', function() {
	  navigator.serviceWorker.register('/service-worker.js');
	});
  } 
