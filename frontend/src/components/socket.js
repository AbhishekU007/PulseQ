import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

let stompClient = null;
let history = [];
const MAX_POINTS = 30;

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export function connectMetrics(onMetrics, onEvent) {
  if (stompClient?.connected) return;

  const socket = new SockJS(`${BASE_URL}/ws`);

  stompClient = new Client({
    webSocketFactory: () => socket,
    reconnectDelay: 3000,
    debug: () => {}
  });

  stompClient.onConnect = () => {

    stompClient.subscribe("/topic/metrics", msg => {
      const data = JSON.parse(msg.body);

      const point = {
        time: new Date().toLocaleTimeString(),
        main: data.mainQueueSize,
        retry: data.retryQueueSize,
        dead: data.deadQueueSize
      };

      history.push(point);
      if (history.length > MAX_POINTS) history.shift();

      onMetrics({
        metrics: data,
        history: [...history]
      });
    });

    if (onEvent) {
      stompClient.subscribe("/topic/events", msg => {
        onEvent(JSON.parse(msg.body));
      });
    }
  };

  stompClient.onStompError = frame => {
    console.error("STOMP error:", frame);
  };

  stompClient.activate();
}

export function disconnectSocket() {
  stompClient?.deactivate();
  stompClient = null;
  history = [];
}
