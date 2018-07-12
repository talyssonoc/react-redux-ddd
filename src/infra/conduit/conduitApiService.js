import Axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const axios = Axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
});

export const post = (url, ...options) => axios.post(url, ...options);
