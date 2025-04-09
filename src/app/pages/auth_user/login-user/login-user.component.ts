import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(
    private readonly fb: FormBuilder,
    private readonly authUserRegisretService: AuthUserRegisretService,
    private readonly router: Router
  ) {
    this.loginForm = this.createLoginForm();
  }

  ngOnInit(): void { }

  private createLoginForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  submitForm(): void {
    if (this.loginForm.invalid) {
      this.showInvalidFormAlert();
      return;
    }

    const { email, password } = this.loginForm.value;

    this.authUserRegisretService.login({ email, password }).subscribe({
      next: (response) => this.handleLoginSuccess(response),
      error: (error) => this.handleLoginError(error)
    });
  }

  private handleLoginSuccess(response: any): void {
    if (response.token) {
      localStorage.setItem('token', response.token);
    } else {
      console.warn('No se recibió token en la respuesta');
    }

    const role = this.authUserRegisretService.getUserRole();

    // Si el usuario no tiene acceso, detenemos aquí
    if (!this.redirectUserByRole(role)) {
      return;
    }

    // Solo se muestra si el usuario fue redirigido correctamente
    Swal.fire({
      title: '¡Inicio de sesión exitoso!',
      text: 'Bienvenido al sistema.',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  }

  private handleLoginError(error: any): void {
    console.error('Login error:', error);

    Swal.fire({
      title: 'Error en el inicio de sesión',
      text: 'Credenciales incorrectas. Verifica tu correo y contraseña.',
      icon: 'error',
      confirmButtonText: 'OK'
    });

    this.errorMessage = 'Error al iniciar sesión. Verifica tus credenciales.';
  }

  /**
   * Redirige según el rol del usuario.
   * @returns boolean - true si el acceso fue permitido, false si fue denegado.
   */
  private redirectUserByRole(role: string): boolean {
    switch (role) {
      case 'ROLE_ADMIN':
        this.router.navigate(['/admin/dashboard']);
        return true;

      case 'ROLE_USER':
        this.showAccessDeniedAlert();
        return false;

      default:
        this.router.navigate(['/']);
        return true;
    }
  }

  private showInvalidFormAlert(): void {
    Swal.fire({
      title: 'Formulario inválido',
      text: 'Por favor, ingresa un correo y contraseña válidos.',
      icon: 'warning',
      confirmButtonText: 'OK'
    });
  }

  private showAccessDeniedAlert(): void {
    Swal.fire({
      icon: 'error',
      title: 'Acceso Denegado',
      text: 'No tienes permiso para acceder a esta sección.',
      footer: '<p>Actualmente tienes un rol de usuario. Esta función aún está en desarrollo. ¡Gracias por tu comprensión!</p>'
    });
  }

  forgotPassword(): void {
    Swal.fire({
      title: 'Recuperar Contraseña',
      text: 'Ingresa tu correo electrónico para recibir instrucciones',
      input: 'email',
      inputPlaceholder: 'ejemplo@correo.com',
      showCancelButton: true,
      confirmButtonText: 'Enviar',
      cancelButtonText: 'Cancelar',
      inputValidator: (value) => !value && 'El correo es obligatorio'
    }).then(result => {
      if (result.isConfirmed && result.value) {
        this.sendPasswordRecoveryEmail(result.value);
      }
    });
  }

  private sendPasswordRecoveryEmail(email: string): void {
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
}
