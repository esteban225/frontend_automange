import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {AuthUserRegisretService } from '../../../../service/auth_service/auth-user-regisret.service'; // Importa el servicio
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetForm!: FormGroup;
  token: string | null = null;
  loading = false;
  errorMessage: string | null = null;

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly authService: AuthUserRegisretService, // Usa el servicio
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    // Obtener el token de la URL
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      localStorage.setItem('token', this.token || '');

      if (!this.token) {
        this.errorMessage = 'Token inválido o expirado.';
        return;
      }

      // Inicializar formulario
      this.resetForm = this.fb.group(
        {
          newPassword: ['', [Validators.required, Validators.minLength(6)]],
          confirmPassword: ['', Validators.required]
        },
        { validators: this.passwordsMatchValidator }
      );
    });
  }

  // Validación personalizada para confirmar que las contraseñas coincidan
  passwordsMatchValidator(form: AbstractControl) {
    return form.get('newPassword')?.value === form.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  // Enviar nueva contraseña
  submit(): void {
    if (this.resetForm.invalid || !this.token) return;

    this.loading = true;
    this.errorMessage = null;
    const { newPassword } = this.resetForm.value;

    this.authService.resetPassword(this.token, newPassword).subscribe({
      next: () => {
        Swal.fire({
          title: 'Contraseña restablecida',
          text: 'Tu contraseña ha sido cambiada exitosamente.',
          icon: 'success',
          confirmButtonText: 'OK'
        });

        this.router.navigate(['/login']); // Redirigir al login
      },
      error: () => {
        this.errorMessage = 'Error al restablecer la contraseña. Inténtalo de nuevo.';
        Swal.fire({
          title: 'Error',
          text: 'No se pudo restablecer la contraseña.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}
