import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducer from './controllers/reducer'
import thunk from 'redux-thunk';

export const hubmapStore = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={hubmapStore}><App /></Provider>
, document.getElementById('root'));
serviceWorker.unregister();