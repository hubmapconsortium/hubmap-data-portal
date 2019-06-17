import * as Constants from '../commons/constants';

//define DEFAULT state, so it is never "undefined".
const DEFAULT_STATE = {
    type: '',
    status:'',
    response: {},
    count: 0,
    page:0,
    next: "",
    previous: "",
    error: null,
};

export default function studyResponseReducer(state = DEFAULT_STATE, action){
    console.log('reducer', state, action );
    switch(action.type) {
        case Constants.GLOBAL_FETCH_ACTION:
            console.log(state.status);
            return {
                ...state,
                response: action.response,
                type: action.type,
                status: action.status,
                error: action.error,
                count: action.count,
                page: action.page,
                next: action.next,
                previous: action.previous,
            };
        default :
            return state;
    }
};