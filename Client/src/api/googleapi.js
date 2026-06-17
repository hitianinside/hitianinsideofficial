// google auth
import axios from 'axios';

const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const api = axios.create({
  baseURL: REACT_APP_BACKEND_URL
})

//google Auth 
const googleAuth = (code) => api.get(`/api/auth/google?code=${code}`)

export default googleAuth;