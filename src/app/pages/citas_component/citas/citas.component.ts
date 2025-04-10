import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { Citas } from 'src/app/class/citas_class/citas';
import { CitasService } from 'src/app/service/citas_service/citas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.scss']
})
export class CitasComponent implements OnInit {

 citas: Citas[] = []; // Lista original de citas
 citasFiltradas: Citas[] = []; // Lista filtrada para mostrar en la tabla
  filtroFecha: string = ''; // Texto ingresado en el buscador
  page: number = 1; // Página actual de la paginación

  estadisticas = [
    { titulo: "Traffic", valor: "350,897", color: "bg-danger text-white", icono: "fas fa-chart-bar", porcentaje: "3.48%", trendIcon: "fa fa-arrow-up", textColor: "text-success", periodo: "Since last month" },
    { titulo: "New users", valor: "2,356", color: "bg-warning text-white", icono: "fas fa-chart-pie", porcentaje: "3.48%", trendIcon: "fas fa-arrow-down", textColor: "text-danger", periodo: "Since last week" },
    { titulo: "Sales", valor: "924", color: "bg-yellow text-white", icono: "fas fa-users", porcentaje: "1.10%", trendIcon: "fas fa-arrow-down", textColor: "text-warning", periodo: "Since yesterday" },
    { titulo: "Performance", valor: "49.65%", color: "bg-info text-white", icono: "fas fa-percent", porcentaje: "12%", trendIcon: "fas fa-arrow-up", textColor: "text-success", periodo: "Since last month" }
  ];

  constructor(
    private readonly citasService: CitasService,
    public router: Router
  ) { }

  ngOnInit() {
    this.obtenerCitas();
  }

  private obtenerCitas(): void {
    this.citasService.obtenerListaOProductos().pipe(
      catchError(error => {
        console.error('Error al obtener Citas:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo cargar la lista de Citas. Intenta nuevamente.',
        });
        return throwError(() => error);
      })
    ).subscribe((response: any) => {
      if (response && 'citas' in response && Array.isArray(response.citas)) {
        this.citas = response.citas;
        this.citasFiltradas = response.citas; // Inicializa con todos las citas
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'Atención',
          text: 'La API no devolvió una lista de Citas válida.',
        });
      }
    });
  }

  filtrarCitas(): void {
    this.citasFiltradas = this.citas.filter(cita =>
      cita.fechaPeticion.toLowerCase().includes(this.filtroFecha.toLowerCase())
    );
  }

  actualizarCitas(id: number) {
    this.router.navigate(['/admin/citasActualizar', id]);
  }

  eliminarCitass(id: number) {
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
        this.citasService.eliminarProducto(id).pipe(
          catchError(error => {
            console.error('Error al eliminar Cita:', error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo eliminar la cita. Intenta nuevamente.',
            });
            return throwError(() => error);
          })
        ).subscribe(() => {
          Swal.fire({
            icon: 'success',
            title: 'Cita eliminada',
            text: 'La cita se eliminó correctamente.',
            timer: 1500,
            showConfirmButton: false
          });
          this.obtenerCitas();
        });
      }
    });
  }


}
