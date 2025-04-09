import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthUserRegisretService {

  private readonly apiUrl =  environment.apiUrl;  // URL del servidor

  constructor(private readonly http: HttpClient, private readonly router: Router) { }


  /**
   * Registra un nuevo usuario enviando los datos al backend.
   * @param userData - .
   * @returns Observable con la respuesta del servidor.
   */
  register(userData: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/api/auth/register`, userData, { headers });
  }

  login(userData: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/auth/login`, userData);
  }
  
  getUserRole(): string {
    const token = localStorage.getItem('token');
    if (!token) return '';
    
    try {
      const base64Payload = token.split('.')[1];
      const jsonPayload = atob(base64Payload);
      const payload = JSON.parse(jsonPayload);
  
      // Aquí accedes a 'roles', que es un array
      const roles = payload.roles;
  
      // Asegúrate de que es un array y toma el primero (o ajusta según tu lógica)
      if (Array.isArray(roles) && roles.length > 0) {
        return roles[0]; // Ejemplo: "ROLE_ADMIN"
      }
  
      return '';
    } catch (e) {
      console.error('Error decoding token', e);
      return '';
    }
  }
  
  
  isLoggedIn(): boolean {
    const token = localStorage.getItem('token'); // Obtiene el token del almacenamiento local
    return !!token; // Retorna verdadero si el token existe
  }

  logout(): void {
    localStorage.removeItem('token'); // Elimina el token del almacenamiento local
    this.router.navigate(['/login']); // Redirige al usuario a la página de inicio de sesión
  }

  forgotPassword(email: string) {
    return this.http.post(`${this.apiUrl}/api/auth/forgot-password`, { email }, { responseType: 'text' }).pipe(
      catchError(error => {
        console.error('Error en forgot-password:', error);
        return throwError(() => new Error('Error al enviar la solicitud de restablecimiento.'));
      })
    );
  }

  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/auth/reset-password`, { token, newPassword }, { responseType: 'text' }).pipe(
      catchError(error => {
        console.error('Error en resetPassword:', error);
        return throwError(() => new Error('No se pudo restablecer la contraseña.'));
      })
    );
  }
  
  

}
