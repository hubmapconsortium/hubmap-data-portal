import * as Constants from '../commons/constants';

//define DEFAULT state, so it is never "undefined".
const DEFAULT_STATE = {
    type: '',
    status:'',
    colors: {},
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
                count: state.count,
                page: state.page,
                next: state.next,
                previous: state.previous,
            };
    }
};