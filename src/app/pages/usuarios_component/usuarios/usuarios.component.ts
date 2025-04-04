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

  usuarios: Usuarios[] = [];
  usuariosFiltrados: Usuarios[] = [];
  filtronombre: string = '';
  page: number = 1;

  roles: string[] = ['Administrador', 'Usuario', 'Operador'];

  estadisticas = [
    { titulo: "Usuarios registrados", valor: "350,897", color: "bg-danger text-white", icono: "fas fa-chart-bar", porcentaje: "3.48%", trendIcon: "fa fa-arrow-up", textColor: "text-success", periodo: "Desde el mes pasado" },
    { titulo: "Usuarios nuevos", valor: "2,356", color: "bg-warning text-white", icono: "fas fa-chart-pie", porcentaje: "3.48%", trendIcon: "fas fa-arrow-down", textColor: "text-danger", periodo: "Desde la semana pasada" },
    { titulo: "Compras", valor: "924", color: "bg-yellow text-white", icono: "fas fa-users", porcentaje: "1.10%", trendIcon: "fas fa-arrow-down", textColor: "text-warning", periodo: "Desde ayer" },
    { titulo: "Devoluciones", valor: "49.65%", color: "bg-info text-white", icono: "fas fa-percent", porcentaje: "12%", trendIcon: "fas fa-arrow-up", textColor: "text-success", periodo: "Desde el mes pasado" }
  ];

  constructor(
    private usuariosService: UsuariosService,
    private router: Router
  ) { }

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.usuariosService.getUsuarios().pipe(
      catchError(error => {
        this.mostrarError('No se pudo cargar la lista de usuarios.');
        return throwError(() => error);
      })
    ).subscribe((response: any) => {
      if (response?.usuarios && Array.isArray(response.usuarios)) {
        this.usuarios = response.usuarios;
        this.usuariosFiltrados = [...this.usuarios];
      } else {
        this.mostrarAlerta('Atención', 'La API no devolvió una lista válida de usuarios.', 'warning');
      }
    });
  }

  filtrarUsuarios(): void {
    const filtro = this.filtronombre.toLowerCase();
    this.usuariosFiltrados = this.usuarios.filter(u => u.nombre.toLowerCase().includes(filtro));
  }

  toggleEstado(usuario: Usuarios): void {
    usuario.activo = !usuario.activo;
    this.usuariosService.actualizarEstado(usuario.id, usuario.activo).subscribe({
      next: (res) => {
        console.log('Respuesta del backend:', res);
        const estado = usuario.activo ? 'activado' : 'desactivado';
        this.mostrarExito(`Usuario ${estado}`, `El estado de ${usuario.nombre} se actualizó correctamente.`);
      },
      error: (err) => {
        console.error('Error recibido:', err);
        this.mostrarError('No se pudo actualizar el estado.');
      }
    });
  }


  detallesUsuarios(id: number): void {
    this.router.navigate(['/admin/usuariosDetalles', id]);
  }

  actualizarUsuarios(id: number): void {
    this.router.navigate(['/admin/usuariosActualizar', id]);
  }

  eliminarUsuarios(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        this.usuariosService.eliminarUsuarios(id).pipe(
          catchError(error => {
            this.mostrarError('No se pudo eliminar el usuario.');
            return throwError(() => error);
          })
        ).subscribe(() => {
          this.mostrarExito('Usuario eliminado', 'El usuario se eliminó correctamente.');
          this.cargarUsuarios();
        });
      }
    });
  }

  // Métodos auxiliares para mostrar mensajes
  private mostrarExito(titulo: string, mensaje: string): void {
    Swal.fire({ icon: 'success', title: titulo, text: mensaje, timer: 1500, showConfirmButton: false });
  }

  private mostrarError(mensaje: string): void {
    Swal.fire({ icon: 'error', title: 'Error', text: mensaje });
  }

  private mostrarAlerta(titulo: string, mensaje: string, tipo: 'warning' | 'info'): void {
    Swal.fire({ icon: tipo, title: titulo, text: mensaje });
  }

}
