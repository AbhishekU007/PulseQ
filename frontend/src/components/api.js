import axios from "axios";

export const sendEvent = (type) =>
  axios.post("http://localhost:8080/events", {
    type,
    data: "user-42"
  });
