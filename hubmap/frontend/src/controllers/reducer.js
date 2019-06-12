import * as Constants from '../commons/constants';

//define DEFAULT state, so it is never "undefined".
const DEFAULT_STATE = {
    type: '',
    status:'',
    response: {},
    error: null,
    isFetching:false,

};

export default function studyReducer(state = DEFAULT_STATE, action){
    console.log('reducer', state, action );
    switch(action.type) {
        case Constants.GLOBAL_FETCH_ACTION:
            return {
                ...state,
                status: state.status,
                error: state.error,
                isFetching: false,
                response: action.response,
            };

        case Constants.GET_TISSUE_COLORS:
            return {
                ...state,
                error: state.error,
                colors: action.colors,
            };
            
        default:
            return state;
    }
};