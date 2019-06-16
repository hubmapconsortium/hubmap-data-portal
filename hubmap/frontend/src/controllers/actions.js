import { GET_STUDIES_REST_API } from "../commons/utils";
import fetch from 'cross-fetch';
import axios from 'axios';
import * as Constants from '../commons/constants';

export const in_progress = () => ({type: Constants.IN_PROGRESS});

export function fetch_studies(response) {
    console.log(response);
    return {
    status: Constants.SUCCESS,
    response: response.results,
    count: response.count,
    page: response.page,
    next: response.next,
    previous: response.previous,
    type: Constants.GLOBAL_FETCH_ACTION,}
}

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

export function search_studies() 
{
    return {type: Constants.GLOBAL_SEARCH_ACTION}
}

async function fetchAllStudies()
{
    const BASE_API =(window.location.href+"api/").replace("3000", "8000");
    return async dispatch => {
        dispatch(in_progress());
        try {
            let response = await axios.get(BASE_API +Constants.GET_STUDIES_REST_API );
            console.log('action',response);

            return dispatch(fetch_studies(response.data));
        }
        catch (error) {
            return dispatch(fetch_studies_error(error));
        }
    }
}

export function fetchStudiesByPage(page) 
{
    const BASE_API =(window.location.href+"api/").replace("3000", "8000");
    return async dispatch => {
        dispatch(in_progress());
        try {
            let response = await axios.get(BASE_API + Constants.GET_STUDIES_PAGINATED_REST_API);
            console.log('action',response);

            return dispatch(fetch_studies(response.data));
        }
        catch (error) {
            return dispatch(fetch_studies_error(error));
        }
    }
}

export function fetchNextPageFromStudies(next) 
{
    return async dispatch => {
        dispatch(in_progress());
        try {
            let response = await axios.get(next);
            console.log('action',response);

            return dispatch(fetch_studies(response.data));
        }
        catch (error) {
            return dispatch(fetch_studies_error(error));
        }
    }
}

export function fetch_colors(colors) 
{
    return {
        response: colors,
        status:Constants.SUCCESS,
        type: Constants.GET_TISSUE_COLORS,
    }
}

export function getTissueColorsFromServer()
{
    const BASE_API =(window.location.href+"api/").replace("3000", "8000");
    console.log(BASE_API);
    return async dispatch =>
    {
        dispatch(in_progress());
        let response = await axios.get(BASE_API + Constants.GET_TISSUE_COLORS_API);
        console.log('action',response.data);
        // wait 3 seconds
        await (new Promise((resolve, reject) => setTimeout(resolve, 2000)));
        return dispatch(fetch_colors(response.data));
	}
}