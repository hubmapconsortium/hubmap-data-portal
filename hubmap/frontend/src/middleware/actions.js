
import axios from 'axios';
import * as Constants from '../commons/constants';
import API_URL from '../commons/apiAdapter';

export const in_progress = () => ({type: Constants.IN_PROGRESS});
/**
 * fills study state props here after any of get methods from experiments reducer
 * @param {Props object} response 
 */
export function get_experiments(response) {
    return {
    status: Constants.SUCCESS,
    response: response.results,
    page: response.page,
    next: response.next,
    previous: response.previous,
    type: Constants.GET_EXPERIMENTS,}
}

/***
 * Fills error details returned by any of get methods from experiments reducer
 */
export const get_experiments_error = error =>{
    return {
    status: Constants.FAILURE,
    response: {},
    error: { error },
    count: 0,
    page:0,
    next: "",
    previous: "",
    type: Constants.GET_EXPERIMENTS,}
}

/**
 * fills study state props here after any of get methods from experiments reducer
 * @param {Props object} response 
 */
export function get_gene_tissue_colors(response) {
    return {
        response: response,
        status:Constants.SUCCESS,
        type: Constants.GET_GENE_TISSUE_COLORS,}
}

/***
 * Search experiments by REST filter api
 */
export function search_experiments(response) 
{
    return {type: Constants.SEARCH_EXPERIMENTS,
        response: response,
        status:Constants.SUCCESS,}
}

/***
 * Fetch all experiments from REST api
 */
export function getAllExperiments()
{
    return async dispatch => {
        dispatch(in_progress());
        try {
            let response = await axios.get(API_URL+Constants.GET_EXPERIMENTS_REST_API );
            const count = response.data.length;
            let results = {
                status: Constants.SUCCESS,
                results: response.data,
                count: count,
                page: 0,
                next: '',
                previous: '',
                type: Constants.GET_EXPERIMENTS,
            }
            console.log(results);
            return dispatch(get_experiments(results));
        }
        catch (error) {
            return dispatch(get_experiments_error(error));
        }
    }
}

/***
 * Fetch experiments by page
 */
export function getExperimentsFirstPage(page) 
{
    return async dispatch => {
        dispatch(in_progress());
        try {
            let response = await axios.get(API_URL+Constants.GET_EXPERIMENTS_PAGINATED_REST_API+page);
            return dispatch(get_experiments(response.data));
        }
        catch (error) {
            return dispatch(get_experiments_error(error));
        }
    }
}

/***
 * Fetch next page from experiments
 */
export function getNextPageFromExperiments(next) 
{
    return async dispatch => {
        dispatch(in_progress());
        try {
            let response = await axios.get(API_URL+next);
            return dispatch(get_experiments(response.data));
        }
        catch (error) {
            return dispatch(get_experiments_error(error));
        }
    }
}

/**
 * Fill colors response from REST api
 */
export function get_colors(colors) 
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
        let response = await axios.get( API_URL+Constants.GET_TISSUE_COLORS_API);
        // wait 3 seconds
        await (new Promise((resolve, reject) => setTimeout(resolve, 2000)));
        console.log(response);
        return dispatch(get_colors(response.data));
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
        let response = await axios.get(API_URL+Constants.GET_GENE_TISSUE_COLOR_API);
        // wait 3 seconds
        await (new Promise((resolve, reject) => setTimeout(resolve, 2000)));
        console.log(response);
        return dispatch(get_gene_tissue_colors(response.data));
	}
}

/***
 * Search experiments
 */
export function searchThis(searchTerm) 
{
    return async dispatch => {
        dispatch(in_progress());
        try {
            let response = await axios.get(API_URL+ Constants.SEARCH_EXPERIMENTS_REST_API+searchTerm);
            return dispatch(search_experiments(response.data));
        }
        catch (error) {
            return dispatch(get_experiments_error(error));
        }
    }
}

export function globusSignin()
{
    
}