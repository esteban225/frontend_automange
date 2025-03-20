import { Injectable } from '@angular/core';
import { Client, Message } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private client!: Client;
  private estadisticasSubject = new Subject<any>();
  private readonly websocketUrl = 'http://localhost:13880/ws'; // 🔹 Cambia 4200 por 8080 (backend)

  constructor() {
    this.connect();
  }

  private connect(): void {
    this.client = new Client({
      webSocketFactory: () => new SockJS(this.websocketUrl),
      debug: (str) => console.log(`WebSocket Debug: ${str}`),
      reconnectDelay: 5000, // 🔹 Intenta reconectar en 5s si se desconecta
      onConnect: (frame) => {
        console.log("✅ Conectado al WebSocket", frame);
        this.subscribeToTopics();
      },
      onStompError: (frame) => {
        console.error("❌ Error en STOMP:", frame);
      },
      onWebSocketClose: () => {
        console.warn("⚠️ Conexión WebSocket cerrada. Intentando reconectar...");
      },
      onDisconnect: () => {
        console.warn("⚠️ Desconectado del WebSocket.");
      }
    });

    this.client.activate();
  }

  private subscribeToTopics(): void {
    if (this.client.connected) {
      this.client.subscribe('/topic/estadisticas', (message: Message) => {
        console.log("📩 Mensaje recibido:", message.body);
        this.estadisticasSubject.next(JSON.parse(message.body));
      });
    } else {
      console.error("❌ Error: Intento de suscripción sin conexión activa.");
    }
  }

  getEstadisticas(): Observable<any> {
    return this.estadisticasSubject.asObservable();
  }

  disconnect(): void {
    if (this.client && this.client.active) {
      this.client.deactivate();
      console.log("🚫 WebSocket desconectado manualmente.");
    }
  }
}
