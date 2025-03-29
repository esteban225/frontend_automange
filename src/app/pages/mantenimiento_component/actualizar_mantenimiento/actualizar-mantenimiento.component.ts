import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';
import { Mantenimiento } from 'src/app/class/mantenimineto_class/mantenimiento';
import { MantenimientosService } from 'src/app/service/mantenimientos_service/mantenimientos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualizar-mantenimiento',
  templateUrl: './actualizar-mantenimiento.component.html',
  styleUrls: ['./actualizar-mantenimiento.component.scss']
})
export class ActualizarMantenimientoComponent implements OnInit {

  mantenimientos: Mantenimiento = new Mantenimiento();
  imagen: File | null = null;
  editMode: boolean = false;

  constructor(
    private readonly mantenimientosService: MantenimientosService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) { }

 ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('ID recibido:', id);
    if (id) {
      this.cargarmantenimiento(+id);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'ID del mantenimiento no encontrado'
      });
    }
  }

  cargarmantenimiento(id: number): void {
    this.mantenimientosService.buscarMantenimientoId(id)
      .pipe(
        tap(response => console.log('Respuesta del backend:', response)), // 🔍 Verifica la respuesta
        catchError(error => {
          console.error('Error al obtener el mantenimiento:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo obtener el mantenimiento'
          });
          return throwError(() => error);
        })
      )
      .subscribe(mantenimiento => { // ✅ Ahora el mantenimiento llega directamente
        if (!mantenimiento?.id) {
          Swal.fire({
            icon: 'warning',
            title: 'Advertencia',
            text: 'El mantenimiento no tiene un ID válido'
          });
          return;
        }
  
        this.mantenimientos = { ...mantenimiento }; // ✅ Asignamos el mantenimiento directamente
        console.log('ID asignado a this.mantenimientos:', this.mantenimientos.id);
        this.editMode = true;
      });
  }
  

  onFileSelected(event: any): void {
    if (event.target.files.length > 0) {
      this.imagen = event.target.files[0];
    }
  }

  actualizarmantenimiento(): void {
    console.log('ID antes de actualizar:', this.mantenimientos.id);
    if (!this.editMode || !this.mantenimientos.id) {
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: 'No se puede actualizar un mantenimiento sin ID'
      });
      return;
    }

    this.mantenimientosService.actualizarMantenimiento(this.mantenimientos.id, this.mantenimientos, this.imagen).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'mantenimiento actualizado correctamente'
        }).then(() => {
            this.router.navigate(['/admin/mantenimientosDetalle', this.mantenimientos.id]);
        });
      },
      error: (error) => {
        console.error('Error al actualizar el mantenimiento:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo actualizar el mantenimiento'
        });
      }
    });
  }

}
