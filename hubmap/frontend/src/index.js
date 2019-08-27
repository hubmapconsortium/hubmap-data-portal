// TODO!
/* eslint-disable import/prefer-default-export */

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './middleware/createStore';

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.getElementById('root'),
);
