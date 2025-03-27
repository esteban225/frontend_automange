import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { Usuarios } from 'src/app/class/usuario_class/usuarios';
import { UsuariosService } from 'src/app/service/usuario_service/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuarios[] = []; // Lista original de productos
  usuariosFiltrados: Usuarios[] = []; // Lista filtrada para mostrar en la tabla
  filtronombre: string = ''; // Texto ingresado en el buscador
  page: number = 1; // Página actual de la paginación

  estadisticas = [
    { titulo: "Traffic", valor: "350,897", color: "bg-danger text-white", icono: "fas fa-chart-bar", porcentaje: "3.48%", trendIcon: "fa fa-arrow-up", textColor: "text-success", periodo: "Since last month" },
    { titulo: "New users", valor: "2,356", color: "bg-warning text-white", icono: "fas fa-chart-pie", porcentaje: "3.48%", trendIcon: "fas fa-arrow-down", textColor: "text-danger", periodo: "Since last week" },
    { titulo: "Sales", valor: "924", color: "bg-yellow text-white", icono: "fas fa-users", porcentaje: "1.10%", trendIcon: "fas fa-arrow-down", textColor: "text-warning", periodo: "Since yesterday" },
    { titulo: "Performance", valor: "49.65%", color: "bg-info text-white", icono: "fas fa-percent", porcentaje: "12%", trendIcon: "fas fa-arrow-up", textColor: "text-success", periodo: "Since last month" }
  ];

  constructor(
    private readonly usuariosService: UsuariosService,
    public router: Router
  ) { }

  ngOnInit() {
    this.obtenerUsuarios();
  }



  tipoes: string[] = ['Administrador', 'Usuario', 'Operador'];
  cambiarRol(usuario: Usuarios) {
    this.usuariosService.actualizarRol(usuario.id, usuario.tipo).subscribe(
      response => {
        Swal.fire({
          icon: 'success',
          title: 'Rol actualizado',
          text: `El rol de ${usuario.nombre} se actualizó correctamente.`,
          timer: 1500,
          showConfirmButton: false
        });
      },
      error => {
        console.error('Error al actualizar el rol:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo actualizar el rol. Intenta nuevamente.',
        });
      }
    );
  }
  
  toggleEstado(usuario: Usuarios) {
    usuario.activo = !usuario.activo;
    this.usuariosService.actualizarEstado(usuario.id, usuario.activo).subscribe(
      response => {
        Swal.fire({
          icon: 'success',
          title: usuario.activo ? 'Usuario activado' : 'Usuario desactivado',
          text: `El estado de ${usuario.nombre} se actualizó correctamente.`,
          timer: 1500,
          showConfirmButton: false
        });
      },
      error => {
        console.error('Error al actualizar el estado:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo actualizar el estado. Intenta nuevamente.',
        });
      }
    );
  }
  
  

  private obtenerUsuarios(): void {
    this.usuariosService.getUsuarios().pipe(
      catchError(error => {
        console.error('Error al obtener Usuarios:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo cargar la lista de Usuarios. Intenta nuevamente.',
        });
        return throwError(() => error);
      })
    ).subscribe((response: any) => {
      console.log('Respuesta de la API:', Response);
      if (response && 'usuarios' in response && Array.isArray(response.usuarios)) {
        this.usuarios = response.usuarios;
        this.usuariosFiltrados = response.usuarios; // Inicializa con todos los usuarios
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'Atención',
          text: 'La API no devolvió una lista de Usuarios válida.',
        });
      }
    });
  }

  filtrarUsuarios(): void {
    this.usuariosFiltrados = this.usuarios.filter(vehiculo =>
      vehiculo.nombre.toLowerCase().includes(this.filtronombre.toLowerCase())
    );
  }

  actualizarUsuarios(id: number) {
    this.router.navigate(['/admin/usuariosActualizar', id]);
  }

  detallesUsuarios(id: number) {
    this.router.navigate(['/admin/usuariosDetalles', id]);
  }

  eliminarUsuarios(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuariosService.eliminarUsuarios(id).pipe(
          catchError(error => {
            console.error('Error al eliminar Vehiculo:', error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo eliminar el Vehiculo. Intenta nuevamente.',
            });
            return throwError(() => error);
          })
        ).subscribe(() => {
          Swal.fire({
            icon: 'success',
            title: 'Vehiculo eliminado',
            text: 'El Vehiculo se eliminó correctamente.',
            timer: 1500,
            showConfirmButton: false
          });
          this.obtenerUsuarios();
        });
      }
    });
  }

}
