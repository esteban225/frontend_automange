import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';
import { Productos } from 'src/app/class/productos_class/productos';
import { ProductosService } from 'src/app/service/producto_service/productos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos-detalles',
  templateUrl: './productos-detalles.component.html',
  styleUrls: ['./productos-detalles.component.scss']
})
export class ProductosDetallesComponent implements OnInit {

  productos: Productos = new Productos();
  editMode: boolean = false;

  constructor(
    private readonly productosService: ProductosService,
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
        text: 'ID del producto no encontrado'
      });
    }
  }

  cargarProducto(id: number): void {
    this.productosService.buscarProductoporId(id)
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

}
