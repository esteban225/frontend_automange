import { Routes } from '@angular/router';

import { LoginUserComponent } from '../../pages/auth_user/login-user/login-user.component';
import {  RegisterUserComponent } from '../../pages/auth_user/register-user/register-user.component';

export const AuthLayoutRoutes: Routes = [
    { path: 'login', component: LoginUserComponent },
    { path: 'register', component: RegisterUserComponent },
];
