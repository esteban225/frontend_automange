import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';
import { Productos } from 'src/app/class/productos_class/productos';
import { ProductosService } from 'src/app/service/producto_service/productos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './productosActualizar.component.html',
  styleUrls: ['./productosActualizar.component.scss']
})
export class ProductosActualizarComponent implements OnInit {

  productos: Productos = new Productos();
  imagen: File | null = null;
  editMode: boolean = false;

  constructor(
    private readonly productoService: ProductosService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('ID recibido:', id);
    if (id) {
      this.cargarProducto(+id);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'ID del producto no encontrado'
      });
    }
  }

  cargarProducto(id: number): void {
    this.productoService.buscarProductoporId(id)
      .pipe(
        tap(response => console.log('Respuesta del backend:', response)), // 🔍 Verifica la respuesta
        catchError(error => {
          console.error('Error al obtener el producto:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo obtener el producto'
          });
          return throwError(() => error);
        })
      )
      .subscribe(producto => { // ✅ Ahora el producto llega directamente
        if (!producto?.id) {
          Swal.fire({
            icon: 'warning',
            title: 'Advertencia',
            text: 'El producto no tiene un ID válido'
          });
          return;
        }
  
        this.productos = { ...producto }; // ✅ Asignamos el producto directamente
        console.log('ID asignado a this.productos:', this.productos.id);
        this.editMode = true;
      });
  }
  
  



  onFileSelected(event: any): void {
    if (event.target.files.length > 0) {
      this.imagen = event.target.files[0];
    }
  }

  actualizarProducto(): void {
    console.log('ID antes de actualizar:', this.productos.id);
    if (!this.editMode || !this.productos.id) {
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: 'No se puede actualizar un producto sin ID'
      });
      return;
    }

    this.productoService.actualizarProducto(this.productos.id, this.productos, this.imagen).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Producto actualizado correctamente'
        }).then(() => {
          this.router.navigate(['/admin/productos']);
        });
      },
      error: (error) => {
        console.error('Error al actualizar el producto:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo actualizar el producto'
        });
      }
    });
  }
}
