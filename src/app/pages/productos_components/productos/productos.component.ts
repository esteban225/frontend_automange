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

  productos: Productos[] = []; // Lista original de productos
  productosFiltrados: Productos[] = []; // Lista filtrada para mostrar en la tabla
  filtroNombre: string = ''; // Texto ingresado en el buscador
  page: number = 1; // Página actual de la paginación

  estadisticas = [
    { titulo: "Traffic", valor: "350,897", color: "bg-danger text-white", icono: "fas fa-chart-bar", porcentaje: "3.48%", trendIcon: "fa fa-arrow-up", textColor: "text-success", periodo: "Since last month" },
    { titulo: "New users", valor: "2,356", color: "bg-warning text-white", icono: "fas fa-chart-pie", porcentaje: "3.48%", trendIcon: "fas fa-arrow-down", textColor: "text-danger", periodo: "Since last week" },
    { titulo: "Sales", valor: "924", color: "bg-yellow text-white", icono: "fas fa-users", porcentaje: "1.10%", trendIcon: "fas fa-arrow-down", textColor: "text-warning", periodo: "Since yesterday" },
    { titulo: "Performance", valor: "49.65%", color: "bg-info text-white", icono: "fas fa-percent", porcentaje: "12%", trendIcon: "fas fa-arrow-up", textColor: "text-success", periodo: "Since last month" }
  ];

  constructor(
    private readonly productosService: ProductosService,
    public router: Router
  ) { }

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
    ).subscribe((response: any) => {
      console.log("productos servidor:", Response );
      if (response && 'productos' in response && Array.isArray(response.productos)) {
        this.productos = response.productos;
        this.productosFiltrados = response.productos; // Inicializa con todos los productos
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'Atención',
          text: 'La API no devolvió una lista de productos válida.',
        });
      }
    });
  }

  filtrarProductos(): void {
    this.productosFiltrados = this.productos.filter(producto =>
      producto.nombre.toLowerCase().includes(this.filtroNombre.toLowerCase())
    );
  }

  actualizarProducto(id: number) {
    this.router.navigate(['/admin/productosActualizar', id]);
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
