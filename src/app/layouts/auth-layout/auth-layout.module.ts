import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AuthLayoutRoutes } from './auth-layout.routing';
import { LoginUserComponent } from '../../pages/auth_user/login-user/login-user.component';
import { RegisterUserComponent } from '../../pages/auth_user/register-user/register-user.component';
import { ResetPasswordComponent } from '../../pages/auth_user/resetpssw_component/reset-password/reset-password.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    LoginUserComponent,
    RegisterUserComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(AuthLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MatDialogModule
  ],
  exports: [] // Exportamos el componente si se usa en otros módulos
})
export class AuthLayoutModule { 
  constructor() {
    console.log('AuthLayoutModule cargado');
  }
}
