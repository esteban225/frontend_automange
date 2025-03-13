import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Productos } from 'src/app/class/productos_class/productos';
import { ProductosService } from 'src/app/service/producto_service/productos.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
  
  productos: Productos[] = [];

  constructor(
    private readonly productosService: ProductosService,
    public router: Router
  ) {}

  ngOnInit() {
    this.obtenerProductos();
  }

  private obtenerProductos(): void {
    this.productosService.getProductos().pipe(
      catchError(error => {
        console.error('Error al obtener productos:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo cargar la lista de productos. Intenta nuevamente.',
        });
        return throwError(() => error);
      })
    ).subscribe((response: any) => {  // 🔹 CORRECCIÓN: Se tipa como `any` para evitar errores de TypeScript
      if (response && 'productos' in response && Array.isArray(response.productos)) {
        this.productos = response.productos;
        if (this.productos.length > 0) {
          Swal.fire({
            icon: 'success',
            title: 'Productos cargados',
            text: 'Lista de productos obtenida correctamente.',
            timer: 1500,
            showConfirmButton: false
          });
        } else {
          Swal.fire({
            icon: 'warning',
            title: 'Atención',
            text: 'No hay productos disponibles.',
          });
        }
      } else {
        console.warn('La API no devolvió un array válido:', response);
        Swal.fire({
          icon: 'warning',
          title: 'Atención',
          text: 'La API no devolvió una lista de productos válida.',
        });
      }
    });
  }

  actualizarProducto(id: number) {
    this.router.navigate(['productosActualizar', id]);
  }

  eliminarProducto(id: number) {
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
        this.productosService.eliminarProducto(id).pipe(
          catchError(error => {
            console.error('Error al eliminar producto:', error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo eliminar el producto. Intenta nuevamente.',
            });
            return throwError(() => error);
          })
        ).subscribe(() => {
          Swal.fire({
            icon: 'success',
            title: 'Producto eliminado',
            text: 'El producto se eliminó correctamente.',
            timer: 1500,
            showConfirmButton: false
          });
          this.obtenerProductos();
        });
      }
    });
  }
}
