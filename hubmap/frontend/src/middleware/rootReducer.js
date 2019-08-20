import { combineReducers } from 'redux';
import colorsReducer from './colorsReducer';
import experimentsReducer from './experimentsReducer';
import geneTissueColorResponseReducer from './geneTissueColorsReducer';
import searchReducer from './searchReducer';

export default combineReducers({
  experimentState: experimentsReducer,
  colorsState: colorsReducer,
  geneTissueColorState: geneTissueColorResponseReducer,
  searchState: searchReducer,
});
