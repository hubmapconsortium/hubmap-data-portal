import { combineReducers } from 'redux';
import colorsReducer from './reducers/colorsReducer';
import experimentsReducer from './reducers/experimentsReducer';
import geneTissueColorResponseReducer from './reducers/geneTissueColorsReducer';
import searchReducer from './reducers/searchReducer';

export default combineReducers({
  experimentState: experimentsReducer,
  colorsState: colorsReducer,
  geneTissueColorState: geneTissueColorResponseReducer,
  searchState: searchReducer,
});
