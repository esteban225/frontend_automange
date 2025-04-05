import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuarios } from '../../class/usuario_class/usuarios';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private readonly baseURL = environment.apiUrl;
  constructor(private readonly HttpClient: HttpClient) { }


  //metodo para obtener los productos del la apiRest
  getUsuarios(): Observable<Usuarios[]> {
    return this.HttpClient.get<Usuarios[]>(`${this.baseURL}/api/usuarios/detalles`);
  }

  //metodo para registrar producto
  registrarUsuarios(productos: Usuarios): Observable<object> {
    return this.HttpClient.post(`${this.baseURL}/api/usuarios`, productos);
  }

  //metodo para actualizar productos
  actualizarUsuarios(id: number, productos: Usuarios): Observable<object> {
    return this.HttpClient.put(`${this.baseURL}/api/usuarios/${id}`, productos);
  }

  //metodo para obtener o buscar producto por id
  buscarUsuariosporId(id: number): Observable<Usuarios> {
    return this.HttpClient.get<Usuarios>(`${this.baseURL}/api/usuarios/getId/${id}`);
  }

  //metodo para eliminar producto
  eliminarUsuarios(id: number): Observable<object> {
    return this.HttpClient.delete(`${this.baseURL}/api/usuarios/${id}`);
  }

  actualizarRol(id: number, nuevoRol: string) {
    return this.HttpClient.put(`${this.baseURL}/api/usuarios/rol/${id}`, { rol: nuevoRol });
  }
  
  actualizarEstado(id: number, estado: boolean): Observable<object> {
    return this.HttpClient.put(`${this.baseURL}/api/usuarios/estado/${id}`, { activo: estado });
  }
}

