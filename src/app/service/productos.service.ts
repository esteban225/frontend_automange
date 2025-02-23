import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Productos } from '../class/productos';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {


  private readonly baseURL = "http://localhost:13880/api/productos";
  constructor(private readonly HttpClient: HttpClient) { }


  //metodo para obtener los productos del la apiRest
  obtenerListaOProductos(): Observable<Productos[]> {
    return this.HttpClient.get<Productos[]>(`${this.baseURL}`);
  }

  //metodo para registrar producto
  registrarProducto(productos: Productos): Observable<object> {
    return this.HttpClient.post(`${this.baseURL}`, productos);
  }

  //metodo para actualizar productos
  actualizarProducto(id: number, productos: Productos): Observable<object> {
    return this.HttpClient.put(`${this.baseURL}/${id}`, productos);
  }

  //metodo para obtener o buscar producto por id
  buscarProductoporId(id: number): Observable<Productos> {
    return this.HttpClient.get<Productos>(`${this.baseURL}/${id}`);
  }

  //metodo para eliminar producto
  eliminarProducto(id: number):Observable<object>{
    return this.HttpClient.delete(`${this.baseURL}/${id}`);
  }
}


// en los layouts añadir los phats de los nuevos componentes creados para que llege el servicio de la api 
//lo mismo en app router y en el sidebar añadir los phats 