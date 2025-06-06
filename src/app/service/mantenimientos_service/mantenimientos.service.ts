import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Mantenimiento } from 'src/app/class/mantenimineto_class/mantenimiento';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class MantenimientosService {

  private readonly baseURL = environment.apiUrl; // URL del servidor
  constructor(private readonly HttpClient: HttpClient) { }


 //metodo para obtener los Mantenimiento del la apiRest
  getMantenimiento(): Observable<Mantenimiento[]> {
    return this.HttpClient.get<Mantenimiento[]>(`${this.baseURL}/api/registroMante`);
  }



  //metodo para registrar Mantenimiento
  registrarMantenimiento(Mantenimiento: Mantenimiento, imagen: File): Observable<Mantenimiento> {
    console.log("Mantenimiento a registrar:", Mantenimiento);

    const formData = new FormData();
    formData.append("mantenimiento", JSON.stringify(Mantenimiento)); // Convertir el producto a JSON
    formData.append("img", imagen); // Adjuntar la imagen

    return this.HttpClient.post<Mantenimiento>(`${this.baseURL}/api/registroMante/register`, formData);
  }

  //metodo para actualizar Mantenimiento
  actualizarMantenimiento(id: number, Mantenimiento: Mantenimiento, imagen: File): Observable<Mantenimiento> {
    console.log("mantenimiento a actualizar:", Mantenimiento);

    const formData = new FormData();
    formData.append("mantenimiento", JSON.stringify(Mantenimiento)); // Convertir el producto a JSON
    formData.append("img", imagen); // Adjuntar la imagen

    return this.HttpClient.put<Mantenimiento>(`${this.baseURL}/api/registroMante/${id}`, formData);
  }

  //metodo para obtener o buscar Mantenimiento por id
  buscarMantenimientoId(id: number): Observable<Mantenimiento> {
    return this.HttpClient.get< Mantenimiento >(`${this.baseURL}/api/registroMante/${id}`).pipe(
      tap(response => console.log('Respuesta del backend:', response)), // ✅ Verifica estructura // ✅ Extrae solo el objeto producto
      catchError(error => {
        console.error('Error en la solicitud:', error);
        return throwError(() => error);
      })
    );
  }

  //metodo para eliminar Mantenimiento
  eliminarMantenimiento(id: number): Observable<object> {
    return this.HttpClient.delete(`${this.baseURL}/api/registroMante/${id}`);
  }
}
