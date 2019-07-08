import * as Constants from '../commons/constants';

//define DEFAULT state, so it is never "undefined".
const DEFAULT_STATE = {
    type: '',
    status:'',
    response: {},
    error: null,
};

/***
 * fill in the state object for colors
 */
export default function geneTissueColorResponseReducer(state = DEFAULT_STATE, action){
    if (action !== undefined)
    {
        switch(action.type) {
            case Constants.GET_GENE_TISSUE_COLORS:
                return {
                    ...state,
                    response: action.response,
                    type: action.type,
                    status: action.status,
                    error: action.error,
                };
                
            default :
                return state;
        }
    }
    return state;
};