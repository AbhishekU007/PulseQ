import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const sendEvent = (type) =>
  axios.post(`${BASE_URL}/events`, {
    type,
    data: "user-42"
  });

export const fetchDeadEvents = () =>
  axios.get(`${BASE_URL}/dead-events`).then(res => res.data);
