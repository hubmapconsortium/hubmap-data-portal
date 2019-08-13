import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reducer from './middleware/rootReducer'
import thunk from 'redux-thunk';

export const store = createStore(reducer, applyMiddleware(thunk));
(store.getState());

ReactDOM.render(
	<Provider store={store}><App/></Provider>,
	document.getElementById('root')
);
