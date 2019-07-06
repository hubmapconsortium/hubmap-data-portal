import {combineReducers} from 'redux';
import colorsReducer from './colorsReducer';
import studiesReducer from './studiesReducer';
import geneTissueColorResponseReducer from './geneTissueColorsReducer'
import searchReducer from './searchReducer'

export default combineReducers({
    studyState: studiesReducer,
    colorsState: colorsReducer,
    geneTissueColorState: geneTissueColorResponseReducer,
    searchState: searchReducer,
});