import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { Productos } from '../../class/productos_class/productos';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {


  private readonly baseURL = environment.apiUrl;  // URL del servidor;
  constructor(private readonly HttpClient: HttpClient) { }


  //metodo para obtener los productos del la apiRest
  getProductos(): Observable<Productos[]> {
    return this.HttpClient.get<Productos[]>(`${this.baseURL}/api/productos`);
  }


//metodo para registrar productos
  registrarProducto(producto: Productos , imagen: File): Observable<Productos> {
    console.log("Producto a registrar:", producto);

    const formData = new FormData();
    formData.append("productos", JSON.stringify(producto)); // Convertir el producto a JSON
    formData.append("img", imagen); // Adjuntar la imagen

    return this.HttpClient.post<Productos>(`${this.baseURL}/api/productos/register`, formData);
  }


  //metodo para actualizar productos
  actualizarProducto(id: number, producto: Productos , imagen: File): Observable<Productos> {

    console.log("Producto a actualizar:", producto);

    const formData = new FormData();
    formData.append("productos", JSON.stringify(producto)); // Convertir el producto a JSON
    formData.append("img", imagen); // Adjuntar la imagen

    return this.HttpClient.put<Productos>(`${this.baseURL}/api/productos/${id}`, formData);
  }

  buscarProductoporId(id: number): Observable<Productos> {
    return this.HttpClient.get<{ producto: Productos }>(`${this.baseURL}/api/productos/${id}`).pipe(
      tap(response => console.log('Respuesta del backend:', response)), // ✅ Verifica estructura
      map(response => response.producto), // ✅ Extrae solo el objeto producto
      catchError(error => {
        console.error('Error en la solicitud:', error);
        return throwError(() => error);
      })
    );
  }
  //metodo para eliminar producto
  eliminarProducto(id: number): Observable<object> {
    return this.HttpClient.delete(`${this.baseURL}/api/productos/${id}`);
  }
}


// en los layouts añadir los phats de los nuevos componentes creados para que llege el servicio de la api
//lo mismo en app router y en el sidebar añadir los phats 