import { Injectable } from '@angular/core'; // Importa Injectable para que este servicio pueda ser inyectado en otros componentes
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http'; // Importa las interfaces necesarias para interceptar peticiones HTTP
import { Observable } from 'rxjs'; // Importa Observable para manejar las respuestas HTTP de manera reactiva

@Injectable() // Marca la clase como inyectable, permitiendo que Angular la use como servicio
export class AuthInterceptor implements HttpInterceptor { // Implementa la interfaz HttpInterceptor para interceptar las peticiones HTTP

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Método que intercepta cada solicitud HTTP antes de que salga al servidor

    // Obtiene el token almacenado en localStorage
    const token = localStorage.getItem('token');
    console.log('Token en Interceptor:', token); // Muestra el token en la consola para depuración

    // Si hay token, clonamos la petición original y añadimos el header de autorización
    if (token) {
      const clonedRequest = req.clone({ // Clona la petición original para no modificarla directamente
        setHeaders: { // Agrega el encabezado de autorización con el token
          Authorization: `Bearer ${token}`
        }
      });
      return next.handle(clonedRequest); // Envía la petición clonada con el token incluido
    }

    // Si no hay token, enviamos la petición original sin modificarla
    return next.handle(req);
  }
}
