import { GET_STUDIES_REST_API } from "../commons/utils";
import fetch from 'cross-fetch';
import axios from 'axios';

//the following are two basic gloabl REST API level actions, we need more, later. 
// first thing first...
export const GLOBAL_FETCH_ACTION = "GLOBAL_FETCH_STUDIES";
export const GLOBAL_SEARCH_ACTION = "GLOBAL_SEARCH_STUDIES";
export const GLOBAL_FETCH_ERROR = "GLOBAL_FETCH_ERROR";

export function fetch_studies(studies) {
    return {
    isFetching: false,
    studies: studies,
    type: GLOBAL_FETCH_ACTION,}
}

export const fetch_studies_error = error =>{
    return {
    isFetching: false,
    studies: [],
    error: { error },
    type: GLOBAL_FETCH_ERROR,}
}

export function search_studies() {
    return {type: GLOBAL_SEARCH_ACTION}
}

async function fetchStudiesData(){
    const response = await axios.get(GET_STUDIES_REST_API);
    return response;
}

export function fetchStudies() {
    return async dispatch => {
        try {
            const response = await axios.get(GET_STUDIES_REST_API);
            console.log('action',response);
            return dispatch(fetch_studies(response.data));
        }
        catch (error) {
            const errorMessage = console.log('An error occurred.', error);
            return dispatch(fetch_studies_error(error));
        }
    }
}