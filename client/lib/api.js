import axios from 'axios';

const api = axios.create({
  // Point directly to the /api route
  baseURL: 'http://localhost:5000/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;