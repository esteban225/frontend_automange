import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';
import { Usuarios } from 'src/app/class/usuario_class/usuarios';
import { UsuariosService } from 'src/app/service/usuario_service/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalles-usuarios',
  templateUrl: './detalles-usuarios.component.html',
  styleUrls: ['./detalles-usuarios.component.scss']
})
export class DetallesUsuariosComponent implements OnInit {

  usuario: Usuarios = new Usuarios();
  editMode: boolean = false;

  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly route: ActivatedRoute,
    public readonly router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('ID recibido:', id);
    if (id) {
      this.cargarUsuario(+id);
    } else {
      console.error('ID no encontrado');
    }
  }

  cargarUsuario(id: number): void {
    this.usuariosService.buscarUsuariosporId(id)
      .pipe(
        tap(response => console.log('Respuesta del backend:', response)),
        catchError(error => {
          console.error('Error al obtener el usuario:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo obtener el usuario'
          });
          return throwError(() => error);
        })
      )
      .subscribe(response => {
        const usuario = response.usuario;

        if (!usuario?.id) {
          Swal.fire({
            icon: 'warning',
            title: 'Advertencia',
            text: 'El usuario no tiene un ID válido'
          });
          return;
        }

        this.usuario = { ...usuario };
        console.log('Usuario cargado:', this.usuario);
        this.editMode = true;
      });
  }
}
