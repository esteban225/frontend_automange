import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { Vehiculos } from 'src/app/class/vehiculos_class/vehiculos';
import { VehiculosService } from 'src/app/service/vehiculos_service/vehiculos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styleUrls: ['./vehiculos.component.scss']
})
export class VehiculosComponent implements OnInit {
  vehiculos: Vehiculos[] = []; // Lista original de productos
  vehiculosFiltrados: Vehiculos[] = []; // Lista filtrada para mostrar en la tabla
  filtroPlaca: string = ''; // Texto ingresado en el buscador
  page: number = 1; // Página actual de la paginación

  estadisticas = [
    { titulo: "Traffic", valor: "350,897", color: "bg-danger text-white", icono: "fas fa-chart-bar", porcentaje: "3.48%", trendIcon: "fa fa-arrow-up", textColor: "text-success", periodo: "Since last month" },
    { titulo: "New users", valor: "2,356", color: "bg-warning text-white", icono: "fas fa-chart-pie", porcentaje: "3.48%", trendIcon: "fas fa-arrow-down", textColor: "text-danger", periodo: "Since last week" },
    { titulo: "Sales", valor: "924", color: "bg-yellow text-white", icono: "fas fa-users", porcentaje: "1.10%", trendIcon: "fas fa-arrow-down", textColor: "text-warning", periodo: "Since yesterday" },
    { titulo: "Performance", valor: "49.65%", color: "bg-info text-white", icono: "fas fa-percent", porcentaje: "12%", trendIcon: "fas fa-arrow-up", textColor: "text-success", periodo: "Since last month" }
  ];

  constructor(
    private readonly vehiculosService: VehiculosService,
    public router: Router
  ) { }

  ngOnInit() {
    this.obtenerVehiculos();
  }

  private obtenerVehiculos(): void {
    this.vehiculosService.getVehiculos().pipe(
      catchError(error => {
        console.error('Error al obtener Vehiculos:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo cargar la lista de Vehiculos. Intenta nuevamente.',
        });
        return throwError(() => error);
      })
    ).subscribe((response: any) => {
      console.log('Respuesta de la API:', Response);
      if (response && 'vehiculos' in response && Array.isArray(response.vehiculos)) {
        this.vehiculos = response.vehiculos;
        this.vehiculosFiltrados = response.vehiculos; // Inicializa con todos los vehiculos
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'Atención',
          text: 'La API no devolvió una lista de Vehiculos válida.',
        });
      }
    });
  }

  filtrarVehiculos(): void {
    this.vehiculosFiltrados = this.vehiculos.filter(vehiculo =>
      vehiculo.placa.toLowerCase().includes(this.filtroPlaca.toLowerCase())
    );
  }

  actualizarVehiculos(id: number) {
    this.router.navigate(['/admin/vehiculosActualizar', id]);
  }

  detallesVehiculos(id: number) {
    this.router.navigate(['/admin/vehiculosDetalles', id]);
  }

  eliminarVehiculos(id: number) {
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
        this.vehiculosService.eliminarVehiculos(id).pipe(
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
          this.obtenerVehiculos();
        });
      }
    });
  }

}
