import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthUserRegisretService {

  private readonly apiUrl = 'http://localhost:13880/api/auth';  // URL del servidor

  constructor(private readonly http: HttpClient, private readonly router: Router) { }

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
  
  isLoggedIn(): boolean {
    const token = localStorage.getItem('token'); // Obtiene el token del almacenamiento local
    return !!token; // Retorna verdadero si el token existe
  }

  logout(): void {
    localStorage.removeItem('token'); // Elimina el token del almacenamiento local
    this.router.navigate(['/login']); // Redirige al usuario a la página de inicio de sesión
  }

}
