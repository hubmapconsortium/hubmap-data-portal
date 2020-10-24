import * as Constants from '../../commons/constants';

// define DEFAULT state, so it is never "undefined".
const DEFAULT_STATE = {
  type: '',
  status: '',
  response: {},
  count: 0,
  page: 0,
  next: '',
  previous: '',
  error: null,
};

/**
 * fill in state object for experiments
 */
export default function experimentsReducer(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case Constants.GET_EXPERIMENTS:
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
    default:
      return state;
  }
}
