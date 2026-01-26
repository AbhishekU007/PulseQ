import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

let stompClient = null;
let history = [];
const MAX_POINTS = 30;

export function connectMetrics(onMetrics, onEvent) {
  // Don't reconnect if already connected
  if (stompClient?.connected) return;

  const socket = new SockJS("http://localhost:8080/ws");

  stompClient = new Client({
    webSocketFactory: () => socket,
    reconnectDelay: 3000,
    debug: () => {}
  });

  stompClient.onConnect = () => {
    // Subscribe to metrics
    stompClient.subscribe("/topic/metrics", msg => {
      const data = JSON.parse(msg.body);

      // Build history point
      const point = {
        time: new Date().toLocaleTimeString(),
        main: data.mainQueueSize,
        retry: data.retryQueueSize,
        dead: data.deadQueueSize
      };

      history.push(point);

      if (history.length > MAX_POINTS) {
        history.shift();
      }

      // Pass both metrics and history
      onMetrics({
        metrics: data,
        history: [...history]
      });
    });

    // Subscribe to events (if callback provided)
    if (onEvent) {
      stompClient.subscribe("/topic/events", msg => {
        onEvent(JSON.parse(msg.body));
      });
    }
  };

  stompClient.onStompError = (frame) => {
    console.error("STOMP error:", frame);
  };

  stompClient.activate();
}

export function disconnectSocket() {
  stompClient?.deactivate();
  stompClient = null;
  history = []; // Clear history on disconnect
}