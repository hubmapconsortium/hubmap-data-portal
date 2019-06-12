import { GET_STUDIES_REST_API } from "../commons/utils";
import fetch from 'cross-fetch';
import axios from 'axios';
import * as Constants from '../commons/constants';


export function fetch_studies(studies) {
    return {
    isFetching: false,
    status: Constants.SUCCESS,
    response: studies,
    type: Constants.GLOBAL_FETCH_ACTION,}
}

export const fetch_studies_error = error =>{
    return {
    isFetching: false,
    status: Constants.FAILURE,
    response: {},
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
            let response = await axios.get(Constants.GET_STUDIES_REST_API);
            console.log('action',response);

            return dispatch(fetch_studies(response.data));
        }
        catch (error) {
            return dispatch(fetch_studies_error(error));
        }
    }
}

export function fetch_colors(colors) {
    return {
        colors: colors,
    }
}

export function getTissueColorsFromServer(){
    return async dispatch => {
            let response = await axios.get(Constants.GET_TISSUE_COLORS_API);
            console.log('action',response);
            // wait 3 seconds
            await (new Promise((resolve, reject) => setTimeout(resolve, 2000)));
            return dispatch(fetch_colors(response.data));
	}
}