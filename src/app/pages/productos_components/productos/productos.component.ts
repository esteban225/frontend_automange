import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Productos } from 'src/app/class/productos';
import { ProductosService } from 'src/app/service/productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class productosComponent implements OnInit {


  //inicializar la lista de productos 
  productos: Productos[] = [];
  ngOnInit() {
    this.obtenerProductos();
  }

  //construcutor para llamar el servicio de productos 
  constructor(private readonly productosService: ProductosService, public router: Router) { }

  private obtenerProductos(): void {
    this.productosService.obtenerListaOProductos().subscribe(dato => {
      this.productos = dato;
    })
  }

  //metodo para editar producto que redirije a la pagina de editar producto 
  actualizarProducto(id:number){
    this.router.navigate(['productosActualizar',id]);
  }


  //metodo para eliminar producto
  eliminarProducto(id: number) {
    this.productosService.eliminarProducto(id).subscribe(dato =>{
      console.log(dato);
      this.obtenerProductos();
    })
  }
}
