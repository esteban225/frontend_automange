import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { Mantenimiento } from 'src/app/class/mantenimineto_class/mantenimiento';

@Injectable({
  providedIn: 'root'
})
export class MantenimientosService {

  private readonly baseURL = "http://localhost:13880/api/registroMante";
  constructor(private readonly HttpClient: HttpClient) { }


 //metodo para obtener los Mantenimiento del la apiRest
  getMantenimiento(): Observable<Mantenimiento[]> {
    return this.HttpClient.get<Mantenimiento[]>(`${this.baseURL}`);
  }



  //metodo para registrar Mantenimiento
  registrarMantenimiento(Mantenimiento: Mantenimiento, imagen: File): Observable<Mantenimiento> {
    console.log("Mantenimiento a registrar:", Mantenimiento);

    const formData = new FormData();
    formData.append("mantenimiento", JSON.stringify(Mantenimiento)); // Convertir el producto a JSON
    formData.append("img", imagen); // Adjuntar la imagen

    return this.HttpClient.post<Mantenimiento>(`${this.baseURL}/register`, formData);
  }

  //metodo para actualizar Mantenimiento
  actualizarMantenimiento(id: number, Mantenimiento: Mantenimiento, imagen: File): Observable<Mantenimiento> {
    console.log("Mantenimiento a actualizar:", Mantenimiento);

    const formData = new FormData();
    formData.append("Mantenimiento", JSON.stringify(Mantenimiento)); // Convertir el producto a JSON
    formData.append("img", imagen); // Adjuntar la imagen

    return this.HttpClient.put<Mantenimiento>(`${this.baseURL}/${id}`, formData);
  }

  //metodo para obtener o buscar Mantenimiento por id
  buscarMantenimientoId(id: number): Observable<Mantenimiento> {
    return this.HttpClient.get<{ Mantenimiento: Mantenimiento }>(`${this.baseURL}/${id}`).pipe(
      tap(response => console.log('Respuesta del backend:', response)), // ✅ Verifica estructura
      map(response => response.Mantenimiento), // ✅ Extrae solo el objeto producto
      catchError(error => {
        console.error('Error en la solicitud:', error);
        return throwError(() => error);
      })
    );
  }

  //metodo para eliminar Mantenimiento
  eliminarMantenimiento(id: number): Observable<object> {
    return this.HttpClient.delete(`${this.baseURL}/${id}`);
  }
}
