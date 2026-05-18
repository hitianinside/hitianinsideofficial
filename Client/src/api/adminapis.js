import axios from 'axios';

const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const api = axios.create({
  baseURL: REACT_APP_BACKEND_URL
})

//add event
export const addEvent = async (data) => {
  const response = await api.post("/api/admin/event", data);
  return response;
}

export const getAdminEvent = async () => {
  const response = await api.get("/api/admin/event");
  return response;
}

//edit event
export const editEvent = async (id, data) => {
   const response = await api.patch(`/api/admin/event?id=${id}`, data)
   return response;
}

//delete event
export const deleteEvent = async (id) => {
   const response = await api.delete(`/api/admin/event?id=${id}`)
   return response;
}

//Almanac
export const addAlmanac = async (data) => {
  const res = await api.post("/api/admin/almanac", data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  });
  
  return res;
}

export const getAdminAlmanac = async () => {
  const res = await api.get("/api/admin/almanac");
  return res;
}

export const deleteAlmanac = async (id) => {
  const res = await api.delete(`/api/admin/almanac?id=${id}`);
  return res;
}

//get homepage data
export const addHomepageData = async (data) => {
  const res = await api.post("/api/admin/homepage-element", data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  });
  
  return res;
}

export const getAdminHomepageData = async () => {
  const res = await api.get("/api/admin/homepage-element");  
  return res.data;
}

export const deleteHomepageData = async (id) => {
  const res = await api.delete(`/api/admin/homepage-element?id=${id}`);
  return res;
}

//add Cricke scores
export const addCricketScores = async (data) => {
  const response = await api.post("/api/admin/cricket-scores", data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  }); 

  return response;
}

//delete cricket scores
export const deleteCricketScores = async (id) => {
   const response = await api.delete(`/api/admin/cricket-scores?id=${id}`)
   return response;
}

//edit cricket
export const editCricketScores = async (id, data) => {
   const response = await api.patch(`/api/admin/cricket-scores?id=${id}`, data)
   return response;
}

//add Football scores
export const addFootballScores = async (data) => {
  const response = await api.post("/api/admin/football-scores", data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  }); 

  return response;
}

//delete football scores
export const deleteFootballScores = async (id) => {
   const response = await api.delete(`/api/admin/football-scores?id=${id}`)
   return response;
}

//edit football scores
export const editFootballScores = async (id, data) => {
   const response = await api.patch(`/api/admin/football-scores?id=${id}`, data)
   return response;
}

//add Vollyballball scores
export const addVolleyballScores = async (data) => {
  const response = await api.post("/api/admin/volleyball-scores", data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  }); 

  return response;
}

//add Basketball scores
export const addBasketballScores = async (data) => {
  const response = await api.post("/api/admin/basketball-scores", data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  }); 

  return response;
}

//get Cricket Scorecard
export const getAdminCricketScores = async () => {
  const res = await api.get("/api/admin/cricket-scores");
  return res;
}

export const getAdminFootballScores = async () => {
  const res = await api.get("/api/admin/football-scores");
  return res;
}

export const getAdminVolleyballScores = async () => {
  const res = await api.get("/api/admin/volleyball-scores");
  return res;
}

export const getAdminBasketballScores = async () => {
  const res = await api.get("/api/admin/basketball-scores");
  return res;
}

//get all submitted forms
export const contactFormData = async () => {
  const res = await api.get("/api/admin/contact-form");
  return res;
}

export const photographyFormData = async () => {
  const res = await api.get("/api/admin/photography");
  return res;
}

export const poemFormData = async () => {
  const res = await api.get("/api/admin/poem");
  return res;
}

export const artFormData = async () => {
  const res = await api.get("/api/admin/artwork");
  return res;
}