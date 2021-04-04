const axios = require('axios');

const api = axios.create({
  baseURL: `${process.env.BLING_URL}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

module.exports = api;
