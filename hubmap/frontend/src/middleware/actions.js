// TODO!
/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

import axios from 'axios';
import * as Constants from '../commons/constants';
import API_URL from '../commons/apiAdapter';

/**
 * Action Response methods: inProgress, getXXXErrorResponse, getXXXXResponse
 */
export const inProgress = () => (
  {
    type: Constants.IN_PROGRESS,
  });
/**
 * Fills study state props here after any of get methods from experiments reducer
 * @param {Props object} response
 */
export function getExperimentsResponse(response) {
  return {
    status: Constants.SUCCESS,
    response: response.results,
    page: response.page,
    next: response.next,
    previous: response.previous,
    type: Constants.GET_EXPERIMENTS,
  };
}

/**
 * Fills error details returned by any of get methods from experiments reducer
 */
export const getExperimentsErrorResponse = (error) => ({
  status: Constants.FAILURE,
  response: {},
  error: { error },
  count: 0,
  page: 0,
  next: '',
  previous: '',
  type: Constants.GET_EXPERIMENTS,
});

/**
 * Fills study state props here after any of get methods from colors reducer
 * @param {Props object} response
 */
export function getGeneTissueColorsResponse(response) {
  return {
    response,
    status: Constants.SUCCESS,
    type: Constants.GET_GENE_TISSUE_COLORS,
  };
}

/**
 * Search experiments by REST filter api
 */
export function searchExperimentsResponse(response) {
  return {
    response,
    status: Constants.SUCCESS,
    type: Constants.SEARCH_EXPERIMENTS,
  };
}

/**
 * Fill colors response from REST api
 */
export function getColors(colors) {
  return {
    response: colors,
    status: Constants.SUCCESS,
    type: Constants.GET_TISSUE_COLORS,
  };
}

/**
 * Fetch all experiments from REST api
 */
export function getAllExperiments() {
  return async (dispatch) => {
    dispatch(inProgress());
    try {
      const response = await axios.get(API_URL + Constants.GET_EXPERIMENTS_REST_API);
      const count = response.data.length;
      const results = {
        status: Constants.SUCCESS,
        results: response.data,
        count,
        page: 0,
        next: '',
        previous: '',
        type: Constants.GET_EXPERIMENTS,
      };
      console.log(results);
      return dispatch(getExperimentsResponse(results));
    } catch (error) {
      return dispatch(getExperimentsErrorResponse(error));
    }
  };
}

/**
 * Fetch experiments by page
 */
export function getExperimentsFirstPage(page) {
  return async (dispatch) => {
    dispatch(inProgress());
    try {
      const response = await axios.get(API_URL + Constants.GET_EXPERIMENTS_PAGINATED_REST_API + page);
      return dispatch(getExperimentsResponse(response.data));
    } catch (error) {
      return dispatch(getExperimentsErrorResponse(error));
    }
  };
}

/**
 * Fetch next page from experiments
 */
export function getNextPageFromExperiments(next) {
  return async (dispatch) => {
    dispatch(inProgress());
    try {
      const response = await axios.get(API_URL + next);
      return dispatch(getExperimentsResponse(response.data));
    } catch (error) {
      return dispatch(getExperimentsErrorResponse(error));
    }
  };
}

/**
 * Get colors from REST api for tissues SVGs
 */
export function getTissueColorsFromServer() {
  return async (dispatch) => {
    dispatch(inProgress());
    const response = await axios.get(API_URL + Constants.GET_TISSUE_COLORS_API);
    // wait 3 seconds
    await (new Promise((resolve, reject) => setTimeout(resolve, 2000)));
    console.log(response);
    return dispatch(getColors(response.data));
  };
}

/**
 * Get gene-tissue colors maps from REST api for tissues SVGs
 * NOTE: this a temporary tweak for prototype
 */
export function getGeneTissueColors() {
  return async (dispatch) => {
    dispatch(inProgress());
    const response = await axios.get(API_URL + Constants.GET_GENE_TISSUE_COLOR_API);
    // wait 3 seconds
    await (new Promise((resolve, reject) => setTimeout(resolve, 2000)));
    console.log(response);
    return dispatch(getGeneTissueColorsResponse(response.data));
  };
}

/**
 * Search experiments
 */
export function searchThis(searchTerm) {
  return async (dispatch) => {
    dispatch(inProgress());
    try {
      const response = await axios.get(API_URL + Constants.SEARCH_EXPERIMENTS_REST_API + searchTerm);
      return dispatch(searchExperimentsResponse(response.data));
    } catch (error) {
      return dispatch(getExperimentsErrorResponse(error));
    }
  };
}
