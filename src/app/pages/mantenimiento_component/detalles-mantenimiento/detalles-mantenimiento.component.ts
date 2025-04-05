import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';
import { Mantenimiento } from 'src/app/class/mantenimineto_class/mantenimiento';
import { MantenimientosService } from 'src/app/service/mantenimientos_service/mantenimientos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalles-mantenimiento',
  templateUrl: './detalles-mantenimiento.component.html',
  styleUrls: ['./detalles-mantenimiento.component.scss']
})
export class DetallesMantenimientoComponent implements OnInit {

  mantenimiento: Mantenimiento = new Mantenimiento();
  editMode: boolean = false;

  constructor(
    private readonly mantenimientosService: MantenimientosService,
    private readonly route: ActivatedRoute,
    public readonly router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('ID recibido:', id);
    if (id) {
      this.cargarProducto(+id);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'ID del mantenimiento no encontrado'
      });
    }
  }

  cargarProducto(id: number): void {
    console.log('Cargando mantenimiento con ID:', id);
    // Verifica si el ID es válido
    if (isNaN(id) || id <= 0) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'ID de mantenimiento inválido'
      });
      return;
    }
    this.mantenimientosService.buscarMantenimientoId(id)
      .pipe(
        tap((response: Mantenimiento) => console.log('Respuesta del backend:', response)), // 🔍 Verifica la respuesta
        catchError(error => {
          console.error('Error al obtener el mantenimiento:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo obtener el mantenimineto'
          });
          return throwError(() => error);
        })
      )
      .subscribe(mantenimiento => { // ✅ Ahora el producto llega directamente
        console.log('Mantenimiento recibido:', mantenimiento);
        if (!mantenimiento?.id) {
          Swal.fire({
            icon: 'warning',
            title: 'Advertencia',
            text: 'El mantenimiento no tiene un ID válido'
          });
          return;
        }
  
        this.mantenimiento = { ...mantenimiento }; // ✅ Asignamos el producto directamente
        console.log('ID asignado a this.productos:', this.mantenimiento.id);
        this.editMode = true;
      });
  }


  editarMantenimiento(id: number): void {
    this.router.navigate(['/admin/mantenimientosActualizar', id]);
  }
}
