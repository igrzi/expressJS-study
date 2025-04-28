require('dotenv').config();
const axios = require('axios');
const https = require('https');

const agent = new https.Agent({  
  rejectUnauthorized: false,
});

const openSearchClient = axios.create({
  baseURL: process.env.OS_ENDPOINT,
  auth: {
    username: process.env.OS_USERNAME,
    password: process.env.OS_PASSWORD,
  },
  httpsAgent: agent,
});

module.exports = openSearchClient;