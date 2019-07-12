
import axios from 'axios';
import * as Constants from '../commons/Constants';
import PubSub from 'pubsub-js';

/***
 * Fetch all experiments from REST api
 */
export function fetchAllExperiments()
{
    const BASE_API =(window.location.href).replace("8080", "8000");
    console.log("fetchAllExperiments");
    axios.get(BASE_API +Constants.GET_EXPERIMENTS_REST_API ,  { crossdomain: true })
    .then(function(response)
    {
        console.log(results);
        PubSub.publish(Constants.FETCH_EXPERIMENTS_EVENT, response.data );
    });
}

/***
 * Fetch experiments by page
 */
export function fetchStudiesFirstPage(page) 
{
    const BASE_API =(window.location.href).replace("8080", "8000");
    console.log(BASE_API+ Constants.GET_EXPERIMENTS_PAGINATED_REST_API+page);
    axios.get(BASE_API + Constants.GET_EXPERIMENTS_PAGINATED_REST_API+page)
    .then(function(response){
        console.log('action',response.data);
        fetch_experiments(response.data);
    });
}

/***
 * Fetch next page from experiments
 */
export function fetchNextPageFromStudies(next) 
{
    axios.get(next).then(function(response){
    fetch_experiments(response.data);
   });
}

/***
 * Get colors from REST api for tissues SVGs
 */
export function getTissueColorsFromServer()
{
    const BASE_API =(window.location.href).replace("8080", "8000");
    axios.get(BASE_API + Constants.GET_TISSUE_COLORS_API).then(function(response){
        PubSub.publish(Constants.FETCH_TISSUE_COLORS_EVENT, response.data );
    })

}

/***
 * Get gene-tissue colors maps from REST api for tissues SVGs
 * NOTE: this a temporary tweak for prototype
 */
export function getGeneTissueColors()
{
    const BASE_API =(window.location.href).replace("8080", "8000");
    axios.get(BASE_API + Constants.GET_GENE_TISSUE_COLOR_API).then(function(response){
        PubSub.publish(Constants.FETCH_GENE_TISSUE_MAP_EVENT, response.data );
    });
}

/***
 * Fetch experiments by page
 */
export function searchThis(searchTerm) 
{
    const BASE_API =(window.location.href).replace("8080", "8000");
    axios.get(BASE_API+ Constants.SEARCH_EXPERIMENTS_REST_API+searchTerm)
    .then(function(response){
        console.log('action',response.data);
        search_experiments(response.data);
    });
}