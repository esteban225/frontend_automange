import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthUserService {

  private apiUrl = 'http://localhost:13880/api/auth';

  constructor(private readonly http: HttpClient) {}

  /**
   * Método para iniciar sesión
   * @param userData Objeto con email y password
   * @returns Observable con la respuesta del servidor
   */
  login(userData: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, userData);
  }
}
