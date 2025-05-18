import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthUserRegisretService } from 'src/app/service/auth_service/auth-user-regisret.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-success',
  template: '<p>Procesando autenticación...</p>',
})
export class LoginSuccessComponent implements OnInit {
  constructor(private route: ActivatedRoute, private readonly authUserRegisretService: AuthUserRegisretService, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      if (token) {
        localStorage.setItem('token', token);
        const role = this.authUserRegisretService.getUserRole();

        if (!this.redirectUserByRole(role)) return;

        Swal.fire({
          title: '¡Inicio de sesión exitoso!',
          text: 'Bienvenido al sistema.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se recibió token de autenticación.',
        });
        this.router.navigate(['/login']);
      }
    });
  }

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

  private showAccessDeniedAlert(): void {
    Swal.fire({
      icon: 'warning',
      title: 'Acceso Restringido',
      text: 'Actualmente tienes un rol de usuario. Esta función aún está en desarrollo. ¡Gracias por tu comprensión!',
    });
  }
}


