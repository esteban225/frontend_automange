import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';
import { Mantenimiento } from 'src/app/class/mantenimineto_class/mantenimiento';
import { Vehiculos } from 'src/app/class/vehiculos_class/vehiculos';
import { VehiculosService } from 'src/app/service/vehiculos_service/vehiculos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vehiculos-detalles',
  templateUrl: './vehiculos-detalles.component.html',
  styleUrls: ['./vehiculos-detalles.component.scss']
})
export class VehiculosDetallesComponent implements OnInit {
  vehiculo: Vehiculos = new Vehiculos(); // Objeto del vehículo
  mantenimientos: Mantenimiento[] = []; // Lista de mantenimientos
  mantenimientosFiltrados: Mantenimiento[] = []; // Lista filtrada
  filtroNombre: string = ''; // Filtro de búsqueda
  page: number = 1; // Paginación

  constructor(
    private readonly vehiculosService: VehiculosService,
    private readonly route: ActivatedRoute,
    public readonly router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('ID recibido:', id);
    if (id) {
      this.cargarVehiculo(+id);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'ID del vehículo no encontrado'
      });
    }
  }

  cargarVehiculo(id: number): void {
    this.vehiculosService.buscarVehiculosId(id)
      .pipe(
        tap(response => console.log('Respuesta del backend:', response)),
        catchError(error => {
          console.error('Error al obtener el vehículo:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo obtener el vehículo'
          });
          return throwError(() => error);
        })
      )
      .subscribe(response => {
        if (!response?.id) {
          Swal.fire({
            icon: 'warning',
            title: 'Advertencia',
            text: 'El vehículo no tiene un ID válido'
          });
          return;
        }

        this.vehiculo = response; // Asignamos el objeto completo
        console.log('Vehículo asignado:', this.vehiculo);

        // Extraer mantenimientos del vehículo si existe la propiedad
        this.mantenimientos = this.vehiculo['registroMante'] || [];
        this.mantenimientosFiltrados = [...this.mantenimientos]; // Copia para filtrado
      });
  }

  filtrarMantenimientos(): void {
    this.mantenimientosFiltrados = this.mantenimientos.filter(mantenimiento =>
      mantenimiento.nombre.toLowerCase().includes(this.filtroNombre.toLowerCase())
    );
  }

  urlMantenimientoSave() {
    const id = this.vehiculo.id; // Assuming 'id' is a property of 'vehiculo'
    if (id) {
      this.router.navigate(['/admin/mantenimientosRegistro', id]);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'ID del vehículo no encontrado'
      });
    }
  }

  urlMantenimientoDetalle(id: number) {
    this.router.navigate(['/admin/mantenimientosDetalle', id]);
  }
}
