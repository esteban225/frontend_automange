import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuarios } from '../../class/usuario_class/usuarios';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private readonly baseURL = "http://localhost:13880/api/usuarios";
  constructor(private readonly HttpClient: HttpClient) { }


  //metodo para obtener los productos del la apiRest
  getUsuarios(): Observable<Usuarios[]> {
    return this.HttpClient.get<Usuarios[]>(`${this.baseURL}/detalles`);
  }

  //metodo para registrar producto
  registrarUsuarios(productos: Usuarios): Observable<object> {
    return this.HttpClient.post(`${this.baseURL}`, productos);
  }

  //metodo para actualizar productos
  actualizarUsuarios(id: number, productos: Usuarios): Observable<object> {
    return this.HttpClient.put(`${this.baseURL}/${id}`, productos);
  }

  //metodo para obtener o buscar producto por id
  buscarUsuariosporId(id: number): Observable<Usuarios> {
    return this.HttpClient.get<Usuarios>(`${this.baseURL}/${id}`);
  }

  //metodo para eliminar producto
  eliminarUsuarios(id: number): Observable<object> {
    return this.HttpClient.delete(`${this.baseURL}/${id}`);
  }

  actualizarRol(id: number, nuevoRol: string) {
    return this.HttpClient.put(`${this.baseURL}/rol/${id}`, { rol: nuevoRol });
  }
  
  actualizarEstado(id: number, estado: boolean): Observable<object> {
    return this.HttpClient.put(`${this.baseURL}/estado/${id}`, { activo: estado });
  }
  
  
  
}

