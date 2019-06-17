
import axios from 'axios';
import * as Constants from '../commons/constants';

export const in_progress = () => ({type: Constants.IN_PROGRESS});
/**
 * fills study state props here after any of fetch methods from studies reducer
 * @param {Props object} response 
 */
export function fetch_studies(response) {
    console.log(response.page);
    return {
    status: Constants.SUCCESS,
    response: response.results,
    count: response.count,
    page: response.page,
    next: response.next,
    previous: response.previous,
    type: Constants.GLOBAL_FETCH_ACTION,}
}

/***
 * Fills error details returned by any of fetch methods from studies reducer
 */
export const fetch_studies_error = error =>{
    return {
    status: Constants.FAILURE,
    response: {},
    error: { error },
    count: 0,
    page:0,
    next: "",
    previous: "",
    type: Constants.GLOBAL_FETCH_ACTION,}
}

/***
 * Search studies by REST filter api
 */
export function search_studies() 
{
    return {type: Constants.GLOBAL_SEARCH_ACTION}
}

/***
 * Fetch all studies from REST api
 */
export function fetchAllStudies()
{
    const BASE_API =(window.location.href+"api/").replace("3000", "8000");
    return async dispatch => {
        dispatch(in_progress());
        try {
            let response = await axios.get(BASE_API +Constants.GET_STUDIES_REST_API );
            const count = response.data.length;
            let results = {
                status: Constants.SUCCESS,
                results: response.data,
                count: count,
                page: 0,
                next: '',
                previous: '',
                type: Constants.GLOBAL_FETCH_ACTION,
            }
            console.log(results);
            return dispatch(fetch_studies(results));
        }
        catch (error) {
            return dispatch(fetch_studies_error(error));
        }
    }
}

/***
 * Fetch studies by page
 */
export function fetchStudiesFirstPage(page) 
{
    const BASE_API =(window.location.href+"api/").replace("3000", "8000");
    console.log(BASE_API+ Constants.GET_STUDIES_PAGINATED_REST_API+page);
    return async dispatch => {
        dispatch(in_progress());
        try {
            let response = await axios.get(BASE_API + Constants.GET_STUDIES_PAGINATED_REST_API+page);
            console.log('action',response.data);
            return dispatch(fetch_studies(response.data));
        }
        catch (error) {
            return dispatch(fetch_studies_error(error));
        }
    }
}

/***
 * Fetch next page from studies
 */
export function fetchNextPageFromStudies(next) 
{
    return async dispatch => {
        dispatch(in_progress());
        try {
            let response = await axios.get(next);
            return dispatch(fetch_studies(response.data));
        }
        catch (error) {
            return dispatch(fetch_studies_error(error));
        }
    }
}

/**
 * Fill colors response from REST api
 */
export function fetch_colors(colors) 
{
    return {
        response: colors,
        status:Constants.SUCCESS,
        type: Constants.GET_TISSUE_COLORS,
    }
}

/***
 * Get colors from REST api for tissues SVGs
 */
export function getTissueColorsFromServer()
{
    const BASE_API =(window.location.href+"api/").replace("3000", "8000");
    return async dispatch =>
    {
        dispatch(in_progress());
        let response = await axios.get(BASE_API + Constants.GET_TISSUE_COLORS_API);
        // wait 3 seconds
        await (new Promise((resolve, reject) => setTimeout(resolve, 2000)));
        return dispatch(fetch_colors(response.data));
	}
}