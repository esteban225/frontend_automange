import { Routes } from '@angular/router';

import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages/register/register.component';
import { UsuariosRegistrerComponent } from 'src/app/pages/usuarios_component/usuarios-registrer/usuarios-registrer.component';
import { UsuariosLoginComponent } from 'src/app/pages/usuarios_component/usuarios-login/usuarios-login.component';

export const AuthLayoutRoutes: Routes = [
    { path: 'login',          component: LoginComponent },
    { path: 'register',       component: RegisterComponent },
    //Ruta registro usuario
    { path: 'loginUser',          component: UsuariosLoginComponent },
    { path: 'registerUser',       component: UsuariosRegistrerComponent }


];
