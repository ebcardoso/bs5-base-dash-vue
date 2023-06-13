import axios from 'axios';

export const datasource = axios.create({
  baseURL: 'http://localhost:8000'
});

export const getConfigs = function() {
  return {
    headers: {
      Authorization: "Bearer " + localStorage.getItem('access_token')
    }
  }
};