import { Component, OnInit } from '@angular/core'; // Importa Component y OnInit para definir el componente y gestionar su ciclo de vida
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Importa herramientas para manejar formularios reactivos en Angular
import { Router } from '@angular/router';
import { AuthUserRegisretService } from 'src/app/service/auth_service/auth-user-regisret.service'; // Importa el servicio de autenticación
import Swal from 'sweetalert2'; // Importa SweetAlert2 para mostrar alertas personalizadas

@Component({
  selector: 'app-login-user', // Define el selector del componente para usarlo en el HTML
  templateUrl: './login-user.component.html', // Especifica el archivo HTML asociado al componente
  styleUrls: ['./login-user.component.scss'] // Especifica el archivo de estilos CSS del componente
})
export class LoginUserComponent implements OnInit { // Declara la clase del componente e implementa OnInit para inicializarlo

  loginForm: FormGroup; // Define el formulario reactivo para el inicio de sesión
  errorMessage: string = ''; // Variable para almacenar mensajes de error

  ngOnInit(): void { // Método que se ejecuta cuando el componente se inicializa
  }

  constructor(
    private readonly fb: FormBuilder, // Inyecta FormBuilder para construir el formulario de manera reactiva
    private readonly authUserRegisretService: AuthUserRegisretService, // Inyecta el servicio de autenticación
    private readonly router: Router
  ) {
    this.loginForm = this.fb.group({ // Define el formulario con validaciones
      email: ['', [Validators.required, Validators.email]], // Campo de email, requerido y con formato de email válido
      password: ['', [Validators.required, Validators.minLength(8)]] // Campo de contraseña, requerido y con mínimo 8 caracteres
    });
  }

  submitForm() { // Método que se ejecuta cuando el usuario envía el formulario
    if (this.loginForm.valid) { // Verifica si el formulario es válido
      const userData = { // Obtiene los datos ingresados en el formulario
        email: this.loginForm.value.email, 
        password: this.loginForm.value.password
      };

      this.authUserRegisretService.login(userData).subscribe({ // Llama al servicio de autenticación y se suscribe a la respuesta
        next: (response) => { // Maneja la respuesta exitosa
          console.log('Login successful:', response); // Muestra la respuesta en consola

          if (response.token) { // Verifica si la respuesta incluye un token
            localStorage.setItem('token', response.token); // Guarda el token en localStorage para futuras peticiones
            console.log('Token guardado'); // Muestra el token en consola
          } else {
            console.warn('No se recibió token en la respuesta'); // Mensaje de advertencia si no se recibe el token
          } 

          Swal.fire({ // Muestra una alerta de éxito en la interfaz
            title: '¡Inicio de sesión exitoso!',
            text: 'Bienvenido al sistema.',
            icon: 'success',
            confirmButtonText: 'OK'
          });
          this.router.navigate(['/admin/dashboard']);
        },
        error: (error) => { // Maneja la respuesta en caso de error
          console.error('Login error:', error); // Muestra el error en consola

          Swal.fire({ // Muestra una alerta de error en la interfaz
            title: 'Error en el inicio de sesión',
            text: 'Credenciales incorrectas. Verifica tu correo y contraseña.',
            icon: 'error',
            confirmButtonText: 'OK'
          });

          this.errorMessage = 'Error logging in. Please check your credentials.'; // Guarda un mensaje de error en la variable
        }
      });

    } else { // Si el formulario no es válido, muestra una alerta
      console.log('Form Invalid'); // Muestra en consola que el formulario es inválido

      Swal.fire({ // Muestra una alerta de advertencia en la interfaz
        title: 'Formulario inválido',
        text: 'Por favor, ingresa un correo y contraseña válidos.',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
    }
  }



  forgotPassword() {
    Swal.fire({
      title: 'Recuperar Contraseña',
      text: 'Ingresa tu correo electrónico para recibir instrucciones',
      input: 'email',
      inputPlaceholder: 'ejemplo@correo.com',
      showCancelButton: true,
      confirmButtonText: 'Enviar',
      cancelButtonText: 'Cancelar',
      inputValidator: (value) => {
        if (!value) {
          return 'El correo es obligatorio';
        }
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const email = result.value;
  
        this.authUserRegisretService.forgotPassword(email).subscribe({
          next: () => {
            Swal.fire({
              title: 'Correo enviado',
              text: 'Si el correo es válido, recibirás un enlace para restablecer tu contraseña.',
              icon: 'success',
              confirmButtonText: 'OK'
            });
          },
          error: () => {
            Swal.fire({
              title: 'Error',
              text: 'No se pudo enviar el correo. Verifica la dirección ingresada.',
              icon: 'error',
              confirmButtonText: 'OK'
            });
          }
        });
      }
    });
  }  
}
