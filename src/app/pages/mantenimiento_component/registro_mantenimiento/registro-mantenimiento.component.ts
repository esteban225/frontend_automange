import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Mantenimiento } from 'src/app/class/mantenimineto_class/mantenimiento';
import { MantenimientosService } from 'src/app/service/mantenimientos_service/mantenimientos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro-mantenimiento',
  templateUrl: './registro-mantenimiento.component.html',
  styleUrls: ['./registro-mantenimiento.component.scss']
})
export class RegistroMantenimientoComponent implements OnInit {
  mantenimientos: Mantenimiento = new Mantenimiento();
  errorMessage: string = '';
  imagenSeleccionada: File | null = null;
  vehiculoId: number | null = null; // ID del vehículo obtenido del path

  constructor(
    private readonly mantenimientosService: MantenimientosService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Obtener el ID del vehículo desde la URL
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id && !isNaN(Number(id))) {
        this.vehiculoId = Number(id);
        this.mantenimientos.vehiculoId = this.vehiculoId; // Asignar el ID al mantenimiento
      } else {
        Swal.fire({
          title: 'Error',
          text: 'ID de vehículo inválido.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
        this.router.navigate(['/admin/vehiculos']); // Redirigir si el ID no es válido
      }
    });
  }

  guardarmantenimiento() {
    if (!this.vehiculoId) {
      Swal.fire({
        title: 'Error',
        text: 'No se pudo obtener el ID del vehículo.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }

    this.mantenimientosService.registrarMantenimiento(this.mantenimientos, this.imagenSeleccionada).subscribe({
      next: (response) => {
        console.log('Mantenimiento registrado:', response);
        Swal.fire({
          title: '¡Registro exitoso!',
          text: 'Tu mantenimiento ha sido creado con éxito.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        this.router.navigate(['/admin/vehiculosDetalles', this.vehiculoId]);
      },
      error: (error) => {
        console.error('Error en el registro:', error);
        Swal.fire({
          title: 'Error en el registro',
          text: 'No se pudo completar el registro.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
        this.errorMessage = 'Error registrando el mantenimiento. Inténtalo más tarde.';
      }
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.imagenSeleccionada = file;
      console.log("Imagen seleccionada:", this.imagenSeleccionada);
    }
  }
}
