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
                isFetching: false,
                response: action.studies,
            };
        
        default:
            return state;
    }
};