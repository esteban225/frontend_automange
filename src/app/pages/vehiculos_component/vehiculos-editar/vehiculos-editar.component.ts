import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';
import { Vehiculos } from 'src/app/class/vehiculos_class/vehiculos';
import { VehiculosService } from 'src/app/service/vehiculos_service/vehiculos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vehiculos-editar',
  templateUrl: './vehiculos-editar.component.html',
  styleUrls: ['./vehiculos-editar.component.scss']
})
export class VehiculosEditarComponent implements OnInit {

  vehiculos: Vehiculos = new Vehiculos();
  imagen: File | null = null;
  editMode: boolean = false;

  constructor(
    private readonly vehiculoservice: VehiculosService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('ID recibido:', id);
    if (id) {
      this.cargarvehiculo(+id);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'ID del vehiculo no encontrado'
      });
    }
  }

  cargarvehiculo(id: number): void {
    this.vehiculoservice.buscarVehiculosId(id)
      .pipe(
        tap(response => console.log('Respuesta del backend:', response)), // 🔍 Verifica la respuesta
        catchError(error => {
          console.error('Error al obtener el vehiculo:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo obtener el vehiculo'
          });
          return throwError(() => error);
        })
      )
      .subscribe(vehiculo => { // ✅ Ahora el vehiculo llega directamente
        if (!vehiculo?.id) {
          Swal.fire({
            icon: 'warning',
            title: 'Advertencia',
            text: 'El vehiculo no tiene un ID válido'
          });
          return;
        }

        this.vehiculos = { ...vehiculo }; // ✅ Asignamos el vehiculo directamente
        console.log('ID asignado a this.vehiculos:', this.vehiculos.id);
        this.editMode = true;
      });
  }


  onFileSelected(event: any): void {
    if (event.target.files.length > 0) {
      this.imagen = event.target.files[0];
    }
  }

  actualizarvehiculo(): void {
    console.log('ID antes de actualizar:', this.vehiculos.id);
    if (!this.editMode || !this.vehiculos.id) {
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: 'No se puede actualizar un vehiculo sin ID'
      });
      return;
    }

    this.vehiculoservice.actualizarVehiculos(this.vehiculos.id, this.vehiculos, this.imagen).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'vehiculo actualizado correctamente'
        }).then(() => {
          this.router.navigate(['/admin/vehiculos']);
        });
      },
      error: (error) => {
        console.error('Error al actualizar el vehiculo:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo actualizar el vehiculo'
        });
      }
    });
  }

}
