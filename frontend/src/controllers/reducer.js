import { GET_STUDIES_REST_API } from '../commons/utils';
import { GLOBAL_FETCH_ACTION } from '../controllers/actions';

//define DEFAULT state, so it is never "undefined".
const DEFAULT_STATE = {
    studies: [],
    error: null,
    isFetching:false,
    type: '',
};

export default function studyReducer(state = DEFAULT_STATE, action){
    console.log('reducer', state, action );
    switch(action.type) {
        case GLOBAL_FETCH_ACTION:
            return {
                ...state,
                isFetching: false,
                studies: action.studies,
            };
        
        default:
            return state;
    }
};