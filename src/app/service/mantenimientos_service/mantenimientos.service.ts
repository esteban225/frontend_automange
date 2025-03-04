import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mantenimiento } from 'src/app/class/mantenimineto_class/mantenimiento';

@Injectable({
  providedIn: 'root'
})
export class MantenimientosService {

  private readonly baseURL = "http://localhost:13880/api/mantenimientos";
  constructor(private readonly HttpClient: HttpClient) { }


  //metodo para obtener los mantenimiento del la apiRest
  obtenerListaMantenimiento(): Observable<Mantenimiento[]> {
    return this.HttpClient.get<Mantenimiento[]>(`${this.baseURL}`);
  }

  //metodo para registrar mantenimiento
  registrarMantenimiento(mantenimiento: Mantenimiento): Observable<object> {
    return this.HttpClient.post(`${this.baseURL}`, mantenimiento);
  }

  //metodo para actualizar mantenimiento
  actualizarMantenimiento(id: number, mantenimiento: Mantenimiento): Observable<object> {
    return this.HttpClient.put(`${this.baseURL}/${id}`, mantenimiento);
  }

  //metodo para obtener o buscar mantenimiento por id
  buscarMantenimientoId(id: number): Observable<Mantenimiento> {
    return this.HttpClient.get<Mantenimiento>(`${this.baseURL}/${id}`);
  }

  //metodo para eliminar mantenimiento
  eliminarMantenimiento(id: number): Observable<object> {
    return this.HttpClient.delete(`${this.baseURL}/${id}`);
  }
}
