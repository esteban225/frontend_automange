import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Obtiene el token del localStorage
    const token = localStorage.getItem('token');
    console.log('Token en Interceptor:', token); // Verifica si el token está disponible

    // Si hay token, clonamos la petición y añadimos el header de autorización
    if (token) {
      const clonedRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next.handle(clonedRequest);
    }

    // Si no hay token, enviamos la petición original
    return next.handle(req);
  }
}
