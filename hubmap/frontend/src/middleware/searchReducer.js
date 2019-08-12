import * as Constants from '../commons/constants';

//define DEFAULT state, so it is never "undefined".
const DEFAULT_STATE = {
    type: '',
    status: '',
    response: {},
    error: null,
};

/***
 * fill in state object for studies
 */
export default function studyResponseReducer(state = DEFAULT_STATE, action) {
    switch (action.type) {
        case Constants.GLOBAL_SEARCH_ACTION:
            return {
                ...state,
                response: action.response,
                type: action.type,
                status: action.status,
                error: action.error,
            };
        default:
            return state;
    }
};