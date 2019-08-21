// TODO!
/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './middleware/rootReducer';
import App from './App';

export const store = createStore(reducer, applyMiddleware(thunk));
(store.getState());

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.getElementById('root'),
);
