import { Injectable } from '@angular/core';
import { Client } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private stompClient!: Client;
  private messageSubject = new Subject<any>();
  public message$ = this.messageSubject.asObservable();

  constructor() {
    this.connect();
  }

  private connect() {
    const socket = new SockJS('http://localhost:8080/ws'); // URL de tu backend en Spring Boot
    this.stompClient = new Client({
      webSocketFactory: () => socket,
      debug: (msg) => console.log(msg),
      reconnectDelay: 5000, // Reintento automático
    });

    this.stompClient.onConnect = () => {
      console.log('Conectado a WebSocket');
      this.stompClient.subscribe('/topic/dashboard', (message) => {
        this.messageSubject.next(JSON.parse(message.body));
      });
    };

    this.stompClient.activate();
  }

  sendMessage(destination: string, body: any) {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.publish({ destination, body: JSON.stringify(body) });
    }
  }
}
