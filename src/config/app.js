const axios = require('axios');

const env = process.env.NODE_ENV || 'development';
const isProduction = env === 'production';
const isDebug = env === 'development';
const isClient = typeof window !== 'undefined';
const basename = '/barcoordinator';
const apiEndpoint = isDebug
  ? 'http://localhost:4000'
  : 'https://barcoordinator.azurewebsites.net';
const axiosInstance = axios.create({
  baseURL: apiEndpoint,
  headers: { 'cache-control': 'no-cache' }
});

module.exports = {
  isProduction,
  isDebug,
  isClient,
  basename,
  apiEndpoint,
  axiosInstance
};
