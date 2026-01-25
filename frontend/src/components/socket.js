import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

let stompClient = null;

export function connectMetrics(onMessage) {
  const socket = new SockJS("http://localhost:8080/ws");

  stompClient = new Client({
    webSocketFactory: () => socket,
    reconnectDelay: 3000,
    debug: () => {}
  });

  stompClient.onConnect = () => {
    stompClient.subscribe("/topic/metrics", msg => {
      onMessage(JSON.parse(msg.body));
    });
  };

  stompClient.activate();
}

export function disconnectSocket() {
  stompClient?.deactivate();
}
