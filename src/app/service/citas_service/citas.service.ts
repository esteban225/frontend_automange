import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Citas } from 'src/app/class/citas_class/citas';

@Injectable({
  providedIn: 'root'
})
export class CitasService {

   private readonly baseURL = "http://localhost:13880/api/citas";
   constructor(private readonly HttpClient: HttpClient) { }
 
 
   //metodo para obtener los citas del la apiRest
   obtenerListaOProductos(): Observable<Citas[]> {
     return this.HttpClient.get<Citas[]>(`${this.baseURL}`);
   }
 
   //metodo para registrar producto
   registrarProducto(citas: Citas): Observable<object> {
     return this.HttpClient.post(`${this.baseURL}`, citas);
   }
 
   //metodo para actualizar citas
   actualizarProducto(id: number, citas: Citas): Observable<object> {
     return this.HttpClient.put(`${this.baseURL}/${id}`, citas);
   }
 
   //metodo para obtener o buscar citas por id
   buscarProductoporId(id: number): Observable<Citas> {
     return this.HttpClient.get<Citas>(`${this.baseURL}/${id}`);
   }
 
   //metodo para eliminar citas
   eliminarProducto(id: number):Observable<object>{
     return this.HttpClient.delete(`${this.baseURL}/${id}`);
   }
}
