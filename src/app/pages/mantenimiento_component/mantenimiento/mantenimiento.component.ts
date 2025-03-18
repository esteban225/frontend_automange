import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { Mantenimiento } from 'src/app/class/mantenimineto_class/mantenimiento';
import { MantenimientosService } from 'src/app/service/mantenimientos_service/mantenimientos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mantenimiento',
  templateUrl: './mantenimiento.component.html',
  styleUrls: ['./mantenimiento.component.scss']
})
export class MantenimientoComponent implements OnInit {

  mantenimientos: Mantenimiento[] = []; // Lista original de productos
  mantenimientosFiltrados: Mantenimiento[] = []; // Lista filtrada para mostrar en la tabla
  filtroFecha: string = ''; // Texto ingresado en el buscador
  page: number = 1; // Página actual de la paginación

  estadisticas = [
    { titulo: "Traffic", valor: "350,897", color: "bg-danger text-white", icono: "fas fa-chart-bar", porcentaje: "3.48%", trendIcon: "fa fa-arrow-up", textColor: "text-success", periodo: "Since last month" },
    { titulo: "New users", valor: "2,356", color: "bg-warning text-white", icono: "fas fa-chart-pie", porcentaje: "3.48%", trendIcon: "fas fa-arrow-down", textColor: "text-danger", periodo: "Since last week" },
    { titulo: "Sales", valor: "924", color: "bg-yellow text-white", icono: "fas fa-users", porcentaje: "1.10%", trendIcon: "fas fa-arrow-down", textColor: "text-warning", periodo: "Since yesterday" },
    { titulo: "Performance", valor: "49.65%", color: "bg-info text-white", icono: "fas fa-percent", porcentaje: "12%", trendIcon: "fas fa-arrow-up", textColor: "text-success", periodo: "Since last month" }
  ];

  constructor(
    private readonly mantenimientosService: MantenimientosService,
    public router: Router
  ) { }

  ngOnInit() {
    this.obtenerMantenimientos();
  }

  private obtenerMantenimientos(): void {
    this.mantenimientosService.obtenerListaMantenimiento().pipe(
      catchError(error => {
        console.error('Error al obtener Mantenimientos:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo cargar la lista de Mantenimientos. Intenta nuevamente.',
        });
        return throwError(() => error);
      })
    ).subscribe((response: any) => {
      console.log('Respuesta de la API:', Response);
      if (response && 'mantenimientos' in response && Array.isArray(response.mantenimientos)) {
        this.mantenimientos = response.mantenimientos;
        this.mantenimientosFiltrados = response.mantenimientos; // Inicializa con todos los mantenimientos
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'Atención',
          text: 'La API no devolvió una lista de Mantenimientos válida.',
        });
      }
    });
  }

  filtrarMantenimientos(): void {
    this.mantenimientosFiltrados = this.mantenimientos.filter(mantenimiento =>
      mantenimiento.fechaMante.toLowerCase().includes(this.filtroFecha.toLowerCase())
    );
  }

  actualizarMantenimientos(id: number) {
    this.router.navigate(['/admin/mantenimientosActualizar', id]);
  }

  eliminarMantenimientos(id: number) {
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
        this.mantenimientosService.eliminarMantenimiento(id).pipe(
          catchError(error => {
            console.error('Error al eliminar Mantenimiento:', error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo eliminar el Mantenimiento. Intenta nuevamente.',
            });
            return throwError(() => error);
          })
        ).subscribe(() => {
          Swal.fire({
            icon: 'success',
            title: 'Mantenimiento eliminado',
            text: 'El Mantenimiento se eliminó correctamente.',
            timer: 1500,
            showConfirmButton: false
          });
          this.obtenerMantenimientos();
        });
      }
    });
  }


}
