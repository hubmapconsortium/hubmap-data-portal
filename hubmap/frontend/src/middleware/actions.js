
import axios from 'axios';
import * as Constants from '../commons/constants';

export const in_progress = () => ({type: Constants.IN_PROGRESS});
/**
 * fills study state props here after any of fetch methods from studies reducer
 * @param {Props object} response 
 */
export function fetch_studies(response) {
    return {
    status: Constants.SUCCESS,
    response: response.results,
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

/**
 * fills study state props here after any of fetch methods from studies reducer
 * @param {Props object} response 
 */
export function fetch_gene_tissue_colors(response) {
    return {
        response: response,
        status:Constants.SUCCESS,
        type: Constants.GET_GENE_TISSUE_COLORS,}
}

/***
 * Search studies by REST filter api
 */
export function search_studies(response) 
{
    return {type: Constants.GLOBAL_SEARCH_ACTION,
        response: response,
        status:Constants.SUCCESS,}
}

/***
 * Fetch all studies from REST api
 */
export function fetchAllStudies()
{
    return async dispatch => {
        dispatch(in_progress());
        try {
            let response = await axios.get(Constants.GET_STUDIES_REST_API );
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
    return async dispatch => {
        dispatch(in_progress());
        try {
            let response = await axios.get(Constants.GET_STUDIES_PAGINATED_REST_API+page);
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
    return async dispatch =>
    {
        dispatch(in_progress());
        let response = await axios.get( Constants.GET_TISSUE_COLORS_API);
        // wait 3 seconds
        await (new Promise((resolve, reject) => setTimeout(resolve, 2000)));
        return dispatch(fetch_colors(response.data));
	}
}

/***
 * Get gene-tissue colors maps from REST api for tissues SVGs
 * NOTE: this a temporary tweak for prototype
 */
export function getGeneTissueColors()
{
    return async dispatch =>
    {
        dispatch(in_progress());
        let response = await axios.get(Constants.GET_GENE_TISSUE_COLOR_API);
        // wait 3 seconds
        await (new Promise((resolve, reject) => setTimeout(resolve, 2000)));
        return dispatch(fetch_gene_tissue_colors(response.data));
	}
}

/***
 * Fetch studies by page
 */
export function searchThis(searchTerm) 
{
    return async dispatch => {
        dispatch(in_progress());
        try {
            let response = await axios.get( Constants.SEARCH_STUDIES_REST_API+searchTerm);
            return dispatch(search_studies(response.data));
        }
        catch (error) {
            return dispatch(fetch_studies_error(error));
        }
    }
}

export function globusSignin()
{
    
}