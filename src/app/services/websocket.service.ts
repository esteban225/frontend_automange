import { Injectable } from '@angular/core';
import { Client, Message } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private client!: Client;
  private readonly estadisticasSubject = new Subject<any>();

  // ✅ Usamos la URL desde environment
  private readonly websocketUrl = environment.websocketUrl;

  constructor() {
    this.connect();
  }

  private connect(): void {
    this.client = new Client({
      webSocketFactory: () => new SockJS(this.websocketUrl),
      debug: (str) => console.log(`🧩 WebSocket Debug: ${str}`),
      reconnectDelay: 5000,
      onConnect: () => {
        console.log('✅ WebSocket conectado');
        this.subscribeToTopics();
      },
      onStompError: (frame) => {
        console.error('❌ STOMP error:', frame.headers['message'], frame.body);
      },
      onWebSocketClose: () => {
        console.warn('⚠️ WebSocket cerrado. Intentando reconectar...');
      },
      onDisconnect: () => {
        console.warn('⚠️ WebSocket desconectado.');
      }
    });

    this.client.activate();
  }

  private subscribeToTopics(): void {
    // No necesitas comprobar client.connected, STOMP se encarga
    this.client.subscribe('/topic/estadisticas', (message: Message) => {
      const payload = JSON.parse(message.body);
      console.log('📥 Mensaje recibido en /topic/estadisticas:', payload);
      this.estadisticasSubject.next(payload);
    });
  }

  getEstadisticas(): Observable<any> {
    return this.estadisticasSubject.asObservable();
  }

  disconnect(): void {
    if (this.client?.active) {
      this.client.deactivate();
      console.log('🚫 WebSocket desconectado manualmente.');
    }
  }
}
