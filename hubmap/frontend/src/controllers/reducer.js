import * as Constants from '../commons/constants';

//define DEFAULT state, so it is never "undefined".
const DEFAULT_STATE = {
    type: '',
    status:'',
    colors: {},
    response: {},
    error: null,
};

export default function studyReducer(state = DEFAULT_STATE, action){
    console.log('reducer', state, action );
    switch(action.type) {
        case Constants.IN_PROGRESS:
            return {
                ...state,
                status: Constants.IN_PROGRESS,
            };
        default:
            console.log(state.status);
            return {
                ...state,
                response: action.response,
                type: action.type,
                status: action.status,
                error: action.error,
            };
    }
};