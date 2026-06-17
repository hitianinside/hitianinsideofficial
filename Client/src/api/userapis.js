//user apis
import axios from 'axios';

const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const api = axios.create({
  baseURL: REACT_APP_BACKEND_URL,
  withCredentials: true, 
});

//get the user is admin or not
export const getAdmin = async (token) => {
  const response = await api.get('/api/user/isAdmin',{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
}

export const getUserInfo = async () => {
  const userData = JSON.parse(localStorage.getItem('user-info'));
  const token = userData?.token;
  const res = await api.get("/api/user/me" ,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  return res.data;
}

//submit contact us to backend
export const contactFormSubmit = async (data) => {
  const res = await api.post("/api/user/form", data);
  return res.data;
}

//submit artwork to backend
export const artworkFormSubmit = async (data) => {
  const res = await api.post("/api/user/artwork", data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return res.data;
}

//submit photo to backend
export const photoFormSubmit = async (data) => {
  const res = await api.post("/api/user/photography", data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return res.data;
}

//submit poem to backend
export const poemFormSubmit = async (data) => {
  const res = await api.post("/api/user/poem", data);
  return res.data;
}

//submit video to backend
export const videoFormSubmit = async (data) => {
  const res = await api.post("/api/user/video", data);
  return res.data;
}

//submit story to backend
export const storyFormSubmit = async (data) => {
  const res = await api.post("/api/user/story", data);
  return res.data;
}

//get events
export const getEvents = async () => {
  const res = await api.get("/api/user/events");
  return res.data;
}

//get almanac
export const getAlmanacs = async () => {
  const res = await api.get("/api/user/almanacs");
  return res.data;
}
// get Homepage Elements
export const getHomepageComponents = async () => {
  const res = await api.get("/api/user/homepage-elements");
  return res.data;
}

//get Scorecard
export const getCricketScores = async () => {
  const res = await api.get("/api/user/cricket-scores");
  return res.data;
}

export const getFootballScores = async () => {
  const res = await api.get("/api/user/football-scores");
  return res.data;
}

export const getVolleyballScores = async () => {
  const res = await api.get("/api/user/volleyball-scores");
  return res.data;
}

export const getBasketballScores = async () => {
  const res = await api.get("/api/user/basketball-scores");
  return res.data;
}