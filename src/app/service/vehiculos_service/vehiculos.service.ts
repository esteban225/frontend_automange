import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vehiculos } from 'src/app/class/vehiculos_class/vehiculos';

@Injectable({
  providedIn: 'root'
})
export class VehiculosService {

    private readonly baseURL = "http://localhost:13880/api/vehiculos";
    constructor(private readonly HttpClient: HttpClient) { }
  
  
    //metodo para obtener los vehiculos del la apiRest
    obtenerListaOProductos(): Observable<Vehiculos[]> {
      return this.HttpClient.get<Vehiculos[]>(`${this.baseURL}`);
    }
  
    //metodo para registrar vehiculos
    registrarProducto(vehiculos: Vehiculos): Observable<object> {
      return this.HttpClient.post(`${this.baseURL}`, vehiculos);
    }
  
    //metodo para actualizar vehiculos
    actualizarProducto(id: number, vehiculos: Vehiculos): Observable<object> {
      return this.HttpClient.put(`${this.baseURL}/${id}`, vehiculos);
    }
  
    //metodo para obtener o buscar vehiculos por id
    buscarProductoporId(id: number): Observable<Vehiculos> {
      return this.HttpClient.get<Vehiculos>(`${this.baseURL}/${id}`);
    }
  
    //metodo para eliminar vehiculos
    eliminarProducto(id: number):Observable<object>{
      return this.HttpClient.delete(`${this.baseURL}/${id}`);
    }
}
