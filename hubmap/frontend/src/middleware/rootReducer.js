import { combineReducers } from 'redux';
import colorsReducer from './colorsReducer';
import studiesReducer from './studiesReducer';

export default combineReducers({
    studyState: studiesReducer,
    colorsState: colorsReducer
});