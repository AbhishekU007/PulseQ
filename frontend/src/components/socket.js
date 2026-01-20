import SockJS from "sockjs-client/dist/sockjs";
import { Client } from "@stomp/stompjs";

export function connectMetrics(setMetrics) {
  const client = new Client({
    webSocketFactory: () =>
      new SockJS("http://localhost:8080/ws"),

    reconnectDelay: 2000,

    onConnect: () => {
      client.subscribe("/topic/metrics", msg => {
        setMetrics(JSON.parse(msg.body));
      });
    }
  });

  client.activate();
}
