import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Citas } from 'src/app/class/citas_class/citas';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CitasService {

   private readonly baseURL = environment.apiUrl;
   constructor(private readonly HttpClient: HttpClient) { }
 
 
   //metodo para obtener los citas del la apiRest
   obtenerListaOProductos(): Observable<Citas[]> {
     return this.HttpClient.get<Citas[]>(`${this.baseURL}/api/citas`);
   }
 
   //metodo para registrar producto
   registrarProducto(citas: Citas): Observable<object> {
     return this.HttpClient.post(`${this.baseURL}/api/citas`, citas);
   }
 
   //metodo para actualizar citas
   actualizarProducto(id: number, citas: Citas): Observable<object> {
     return this.HttpClient.put(`${this.baseURL}/api/citas/${id}`, citas);
   }
 
   //metodo para obtener o buscar citas por id
   buscarProductoporId(id: number): Observable<Citas> {
     return this.HttpClient.get<Citas>(`${this.baseURL}/api/citas/${id}`);
   }
 
   //metodo para eliminar citas
   eliminarProducto(id: number):Observable<object>{
     return this.HttpClient.delete(`${this.baseURL}/api/citas/${id}`);
   }
}
