import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

export function connectMetrics(onMessage) {
  const socket = new SockJS("http://localhost:8080/ws");

  const client = new Client({
    webSocketFactory: () => socket,
    reconnectDelay: 3000,
    onConnect: () => {
      client.subscribe("/topic/metrics", msg => {
        onMessage(JSON.parse(msg.body));
      });
    }
  });

  client.activate();
}
