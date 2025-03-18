import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Vehiculos } from 'src/app/class/vehiculos_class/vehiculos';
import { VehiculosService } from 'src/app/service/vehiculos_service/vehiculos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vehiculos-regstro',
  templateUrl: './vehiculos-regstro.component.html',
  styleUrls: ['./vehiculos-regstro.component.scss']
})
export class VehiculosRegstroComponent implements OnInit {

 // intancia de la clase vehiculos para crear un nuevo vehiculo
  vehiculos: Vehiculos = new Vehiculos();

  ngOnInit() {
    
  }

  //inyectamos los servicios de vehiculos en el construnctor
  constructor(private readonly vehiculoservice: VehiculosService, private readonly router: Router,) {

  }

  errorMessage: string = '';

  guardarVehiculo() {

    this.vehiculoservice.registrarVehiculos(this.vehiculos, this.imagenSeleccionada).subscribe({ // Llama al servicio de registro y se suscribe a la respuesta
      next: (response) => { // Maneja la respuesta exitosa
        console.log('Product registered successfully:', response); // Muestra la respuesta en consola

        Swal.fire({ // Muestra una alerta de éxito en la interfaz
          title: '¡Registro exitoso!',
          text: 'Tu vehiculo ha sido creada con éxito.',
          icon: 'success',
          confirmButtonText: 'OK'
        });

        this.router.navigate(['/admin/vehiculos']); // Redirige a la lista de vehiculos
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
