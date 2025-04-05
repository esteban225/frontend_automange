import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { Vehiculos } from 'src/app/class/vehiculos_class/vehiculos';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class VehiculosService {

  private readonly baseURL = environment.apiUrl; // URL del servidor
  constructor(private readonly HttpClient: HttpClient) { }


  //metodo para obtener los vehiculos del la apiRest
  getVehiculos(): Observable<Vehiculos[]> {
    return this.HttpClient.get<Vehiculos[]>(`${this.baseURL}/api/vehiculos`);
  }



  //metodo para registrar vehiculos
  registrarVehiculos(vehiculo: Vehiculos, imagen: File): Observable<Vehiculos> {
    console.log("vehiculo a registrar:", vehiculo);

    const formData = new FormData();
    formData.append("vehiculo", JSON.stringify(vehiculo)); // Convertir el producto a JSON
    formData.append("img", imagen); // Adjuntar la imagen

    return this.HttpClient.post<Vehiculos>(`${this.baseURL}/api/vehiculos/register`, formData);
  }

  //metodo para actualizar vehiculos
  actualizarVehiculos(id: number, vehiculo: Vehiculos, imagen: File): Observable<Vehiculos> {
    console.log("vehiculo a actualizar:", vehiculo);

    const formData = new FormData();
    formData.append("vehiculo", JSON.stringify(vehiculo)); // Convertir el producto a JSON
    formData.append("img", imagen); // Adjuntar la imagen

    return this.HttpClient.put<Vehiculos>(`${this.baseURL}/api/vehiculos/${id}`, formData);
  }

  //metodo para obtener o buscar vehiculos por id
  buscarVehiculosId(id: number): Observable<Vehiculos> {
    return this.HttpClient.get<{ vehiculo: Vehiculos }>(`${this.baseURL}/api/vehiculos/${id}`).pipe(
      tap(response => console.log('Respuesta del backend:', response)), // ✅ Verifica estructura
      map(response => response.vehiculo), // ✅ Extrae solo el objeto producto
      catchError(error => {
        console.error('Error en la solicitud:', error);
        return throwError(() => error);
      })
    );
  }

  //metodo para eliminar vehiculos
  eliminarVehiculos(id: number): Observable<object> {
    return this.HttpClient.delete(`${this.baseURL}/api/vehiculos/${id}`);
  }
}
