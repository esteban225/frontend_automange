import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthUserRegisretService } from 'src/app/service/auth_service/auth-user-regisret.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.scss']
})
export class LoginUserComponent implements OnInit {

  loginForm: FormGroup;
  errorMessage: string = '';
  passwordStrength: string = 'weak';


  ngOnInit(): void {
  }



  constructor(private readonly fb: FormBuilder, private readonly authUserRegisretService: AuthUserRegisretService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  submitForm() {
    if (this.loginForm.valid) {
      const userData = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };

      this.authUserRegisretService.login(userData).subscribe({
        next: (response) => {
          console.log('Login successful:', response);

          if (response.token) {
            localStorage.setItem('token', response.token); // Guarda el token
            console.log('Token guardado:', response.token); // Muestra el token en consola
          } else {
            console.warn('No se recibió token en la respuesta');
          } 

          
          Swal.fire({
            title: '¡Inicio de sesión exitoso!',
            text: 'Bienvenido al sistema.',
            icon: 'success',
            confirmButtonText: 'OK'
          });
        },
        error: (error) => {
          console.error('Login error:', error);

          Swal.fire({
            title: 'Error en el inicio de sesión',
            text: 'Credenciales incorrectas. Verifica tu correo y contraseña.',
            icon: 'error',
            confirmButtonText: 'OK'
          });

          this.errorMessage = 'Error logging in. Please check your credentials.';
        }
      });

    } else {
      console.log('Form Invalid');

      Swal.fire({
        title: 'Formulario inválido',
        text: 'Por favor, ingresa un correo y contraseña válidos.',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
    }
  }

}
