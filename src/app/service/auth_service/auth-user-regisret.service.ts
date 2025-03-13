import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthUserRegisretService {

  private readonly apiUrl = 'http://localhost:13880/api/auth';  // URL del servidor

  constructor(private readonly http: HttpClient) {}

  /**
   * Registra un nuevo usuario enviando los datos al backend.
   * @param userData - Datos del usuario (nombre, email, teléfono, dirección, contraseña).
   * @returns Observable con la respuesta del servidor.
   */
  register(userData: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/register`, userData, { headers });
  }

  login(userData: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, userData);
  }

}
