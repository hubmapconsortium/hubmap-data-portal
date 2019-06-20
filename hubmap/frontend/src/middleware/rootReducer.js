import { combineReducers } from 'redux';
import colorsReducer from './colorsReducer';
import studiesReducer from './studiesReducer';
import geneTissueColorResponseReducer from './geneTissueColorsReducer'

export default combineReducers({
    studyState: studiesReducer,
    colorsState: colorsReducer,
    geneTissueColorState: geneTissueColorResponseReducer
});