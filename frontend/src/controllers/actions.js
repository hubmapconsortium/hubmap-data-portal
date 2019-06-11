import { GET_STUDIES_REST_API } from "../commons/utils";
import fetch from 'cross-fetch';
import axios from 'axios';
import * as Constants from '../commons/constants';


export function fetch_studies(studies) {
    return {
    isFetching: false,
    status: Constants.SUCCESS,
    studies: studies,
    type: Constants.GLOBAL_FETCH_ACTION,}
}

export const fetch_studies_error = error =>{
    return {
    isFetching: false,
    status: Constants.FAILURE,
    studies: {},
    error: { error },
    type: Constants.GLOBAL_FETCH_ACTION,}
}

export function search_studies() {
    return {type: Constants.GLOBAL_SEARCH_ACTION}
}

async function fetchStudiesData(){
    const response = await axios.get(Constants.GET_STUDIES_REST_API);
    return response;
}

export function fetchStudies() {
    return async dispatch => {
        try {
            const response = await axios.get(Constants.GET_STUDIES_REST_API);
            console.log('action',response);
            return dispatch(fetch_studies(response.data));
        }
        catch (error) {
            const errorMessage = console.log('An error occurred.', error);
            return dispatch(fetch_studies_error(error));
        }
    }
}