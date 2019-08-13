let API_URL

process.env.REACT_APP_STAGE === 'dev'
    ? API_URL = 'http://localhost:8000/'
    : API_URL = 'https://data.dev.hubmapconsortium.org/'

export default API_URL;