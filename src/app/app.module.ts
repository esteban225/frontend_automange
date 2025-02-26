import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { VehiculosComponent } from './pages/vehiculos_component/vehiculos/vehiculos.component';
import { CitasComponent } from './pages/citas_component/citas/citas.component';
import { MantenimientoComponent } from './pages/mantenimiento_component/mantenimiento/mantenimiento.component';
import { UsuariosComponent } from './pages/usuarios_component/usuarios/usuarios.component';
import { UsuariosLoginComponent } from './pages/usuarios_component/usuarios-login/usuarios-login.component';
import { UsuariosRegistrerComponent } from './pages/usuarios_component/usuarios-registrer/usuarios-registrer.component';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    VehiculosComponent,
    CitasComponent,
    MantenimientoComponent,
    UsuariosComponent,
    UsuariosLoginComponent,
    UsuariosRegistrerComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
