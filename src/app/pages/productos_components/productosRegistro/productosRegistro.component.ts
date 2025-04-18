import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Productos } from 'src/app/class/productos_class/productos';
import { ProductosService } from 'src/app/service/producto_service/productos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './productosRegistro.component.html',
  styleUrls: ['./productosRegistro.component.scss']
})
export class ProductosRegistroComponent implements OnInit {
  // intancia de la clase productos para crear un nuevo producto
  productos: Productos = new Productos();

  ngOnInit() {}

  //inyectamos los servicios de productos en el construnctor
  constructor(private readonly productoService: ProductosService, private readonly router: Router,) {

  }

  errorMessage: string = '';

  guardarProducto() {

    this.productoService.registrarProducto(this.productos, this.imagenSeleccionada).subscribe({ // Llama al servicio de registro y se suscribe a la respuesta
      next: (response) => { // Maneja la respuesta exitosa
        console.log('Product registered successfully:', response); // Muestra la respuesta en consola

        Swal.fire({ // Muestra una alerta de éxito en la interfaz
          title: '¡Registro exitoso!',
          text: 'Tu producto ha sido creada con éxito.',
          icon: 'success',
          confirmButtonText: 'OK'
        });

        this.router.navigate(['/admin/productos']); // Redirige a la lista de productos
      },
      error: (error) => { // Maneja la respuesta en caso de error
        console.error('Registration error:', error); // Muestra el error en consola

        Swal.fire({ // Muestra una alerta de error en la interfaz
          title: 'Error en el registro',
          text: 'No se pudo completar el registro.',
          icon: 'error',
          confirmButtonText: 'OK'
        });

        this.errorMessage = 'Error registering user. Please try again later.'; // Guarda un mensaje de error en la variable
      }
    });
  }

  imagenSeleccionada: File | null = null;

  onFileSelected(event: any) {
    const file: File = event.target.files[0]; // Obtener el archivo seleccionado
    if (file) {
      this.imagenSeleccionada = file;
      console.log("Imagen seleccionada:", this.imagenSeleccionada);
    }
  }
}
