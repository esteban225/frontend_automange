import { Injectable } from '@angular/core';
import { Client } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private client!: Client;

  constructor() {
    this.connect();
  }

  private connect() {
    const socket = new SockJS(environment.websocketUrl); // Usa SockJS para la conexión

    this.client = new Client({
      webSocketFactory: () => socket, // Aquí está la corrección
      reconnectDelay: 5000,
      debug: (msg) => console.log('WebSocket:', msg),
    });

    this.client.onConnect = () => {
      console.log('✅ Conectado al WebSocket');
    };

    this.client.activate();
  }

  sendMessage(destination: string, body: any) {
    if (this.client.connected) {
      this.client.publish({ destination, body: JSON.stringify(body) });
    }
  }

  subscribe(destination: string, callback: (message: any) => void) {
    this.client.subscribe(destination, (message) => {
      callback(JSON.parse(message.body));
    });
  }
}
