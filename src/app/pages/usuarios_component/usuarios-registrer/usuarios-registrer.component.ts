import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthUserRegisretService } from 'src/app/service/auth_service/auth-user-regisret.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios-registrer',
  templateUrl: './usuarios-registrer.component.html',
  styleUrls: ['./usuarios-registrer.component.scss']
})
export class UsuariosRegistrerComponent implements OnInit {

  ngOnInit(): void { // Método que se ejecuta cuando el componente se inicializa
    // Llama a checkPasswordStrength cada vez que se cambia la contraseña
    this.registerForm.get('password')?.valueChanges.subscribe(() => {
      this.checkPasswordStrength();
    });
  }

  registerForm: FormGroup; // Define el formulario reactivo de registro
  passwordStrength: string = 'Debil'; // Variable para manejar la fortaleza de la contraseña
  errorMessage: string = ''; // Variable para almacenar mensajes de error en el registro
  tooltipActive: boolean = false; // Variable para manejar el estado del tooltip

  constructor(
    private readonly fb: FormBuilder, // Inyecta FormBuilder para construir el formulario de manera reactiva
    private readonly authUserRegisretService: AuthUserRegisretService, // Inyecta el servicio de autenticación
    private readonly router: Router // Inyecta el servicio de enrutamiento  
  ) {
    // Define la estructura del formulario y aplica validaciones
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]], // Nombre requerido con mínimo 3 caracteres
      userName: ['', [Validators.required, Validators.minLength(3)]], // Nombre de usuario requerido con mínimo 3 caracteres
      email: ['', [Validators.required, Validators.email]], // Correo requerido con formato válido
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]], // Teléfono requerido con 10 dígitos numéricos
      address: ['', Validators.required], // Dirección requerida
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(7), // La contraseña debe tener al menos 8 caracteres
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/) // La contraseña debe contener mayúsculas, minúsculas, números y caracteres especiales
        ]
      ],
      confirmPassword: ['', Validators.required], // Confirmación de contraseña requerida
      agree: [false, Validators.requiredTrue] // Aceptar términos y condiciones (debe ser `true`)
    }, { validator: this.passwordMatchValidator }); // Aplica una validación personalizada para comparar contraseñas
  }

  // Función para validar que las contraseñas coincidan
  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true }; // Retorna `null` si coinciden, de lo contrario un error
  }

  // Función para chequear la contraseña (ya está correctamente implementada)
  checkPasswordStrength() {
    const password = this.registerForm.get('password')?.value;
    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    this.passwordStrength = strongRegex.test(password) ? 'Fuerte' : 'Debil'; // Se evalúa la fortaleza de la contraseña
  }

  // Método para enviar el formulario
  submitForm() {
    if (this.registerForm.valid) { // Verifica si el formulario es válido
      const userData = { // Crea el objeto con los datos del formulario
        nombre: this.registerForm.value.name,
        username: this.registerForm.value.userName,
        email: this.registerForm.value.email,
        telefono: this.registerForm.value.phone,
        direccion: this.registerForm.value.address,
        password: this.registerForm.value.password
      };

      this.authUserRegisretService.register(userData).subscribe({ // Llama al servicio de registro y se suscribe a la respuesta
        next: (response) => { // Maneja la respuesta exitosa
          console.log('User registered successfully:', response); // Muestra la respuesta en consola
          this.router.navigate(['/login']); // Redirige al usuario a la página de inicio de sesión
          Swal.fire({ // Muestra una alerta de éxito en la interfaz
            title: '¡Registro exitoso!',
            text: 'Tu cuenta ha sido creada con éxito.',
            icon: 'success',
            confirmButtonText: 'OK'
          });
        },
        error: (error) => { // Maneja la respuesta en caso de error
          console.error('Registration error:', error); // Muestra el error en consola
          this.router.navigate(['/login']); // Redirige al usuario a la página de inicio de sesión

          Swal.fire({ // Muestra una alerta de error en la interfaz
            title: 'Error en el registro',
            text: 'No se pudo completar el registro. El usuario ya existe en la base de datos.',
            icon: 'error',
            confirmButtonText: 'OK'
          });

          this.errorMessage = 'Error registering user. Please try again later.'; // Guarda un mensaje de error en la variable
        }
      });

    } else { // Si el formulario no es válido, muestra una alerta
      console.log('Form Invalid'); // Muestra en consola que el formulario es inválido

      Swal.fire({ // Muestra una alerta de advertencia en la interfaz
        title: 'Formulario inválido',
        text: 'Por favor, completa todos los campos correctamente.',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
    }
  }

}
