import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthLayoutRoutes } from './auth-layout.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LoginUserComponent } from '../../pages/auth_user/login-user/login-user.component';
import { RegisterUserComponent } from '../../pages/auth_user/register-user/register-user.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthLayoutRoutes),
    FormsModule,
    NgbModule,
    ReactiveFormsModule
  ],
  declarations: [
    LoginUserComponent,
    RegisterUserComponent
  ]
})
export class AuthLayoutModule { 
  constructor() {
    console.log('AuthLayoutModule');
  }
}
