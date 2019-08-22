// TODO!
/* eslint-disable import/no-mutable-exports */
/* eslint-disable prefer-const */

let API_URL;

API_URL = process.env.REACT_APP_STAGE === 'dev'
  ? 'http://localhost:8000/'
  : '/';

export default API_URL;
