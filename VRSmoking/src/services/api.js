const axios = require('axios');
import config from './config';

const { URL } = config;

const api = axios.create({
    baseURL: URL.VRSMOKING_API
});

export default api;