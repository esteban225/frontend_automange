import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';
import { Productos } from 'src/app/class/productos_class/productos';
import { ProductosService } from 'src/app/service/producto_service/productos.service';

@Component({
  selector: 'app-register',
  templateUrl: './productosRegistro.component.html',
  styleUrls: ['./productosRegistro.component.scss']
})
export class productosRegistroComponent implements OnInit {

  // intancia de la clase productos para crear un nuevo producto
  productos: Productos = new Productos();

  //inyectamos los servicios de productos en el construnctor
  constructor(private productoService: ProductosService, private router: Router) { }
  ngOnInit() {
  }

  guardarProducto() {

    console.log(this.productos);

    this.productoService.registrarProducto(this.productos).pipe(
      tap(dato => {
        console.log(dato);
      }), catchError((error) => {
        console.log(error);
        return throwError(() => new Error(error));
      })
    ).subscribe()
  }
}
