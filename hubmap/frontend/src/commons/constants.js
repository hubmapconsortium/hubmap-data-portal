
//the following are two basic gloabl REST API level actions, we need more, later.
// first thing first...
export const GLOBAL_FETCH_ACTION = "GLOBAL_FETCH_STUDIES";
export const GLOBAL_SEARCH_ACTION = "GLOBAL_SEARCH_STUDIES";
export const GLOBAL_FETCH_ERROR = "GLOBAL_FETCH_ERROR";
export const GET_TISSUE_COLORS = "GET_TISSUE_COLORS";
export const SUCCESS = "SUCCESS";
export const FAILURE = "FAILURE";
export const IN_PROGRESS = "IN_PROGRESS";

export const GET_STUDIES_REST_API = '?format=json';
export const GET_STUDIES_PAGINATED_REST_API = 'studies/?format=json&page=';
export const SEARCH_STUDIES_REST_API = 'search/?format=json&query=';
export const GET_TISSUE_COLORS_API = 'colors/?format=json';
