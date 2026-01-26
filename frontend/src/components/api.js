import axios from "axios";

export const sendEvent = (type) =>
  axios.post("http://localhost:8080/events", {
    type,
    data: "user-42"
  });

  export const fetchDeadEvents = () =>
  axios.get("http://localhost:8080/dead-events").then(res => res.data);
