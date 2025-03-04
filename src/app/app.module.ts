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
import { UsuariosLoginComponent } from './pages/usuarios_component/usuarios-actualizar/usuarios-login.component';
import { UsuariosRegistrerComponent } from './pages/usuarios_component/usuarios-registrer/usuarios-registrer.component';
import { VehiculosRegstroComponent } from './pages/vehiculos_component/vehiculos-regstro/vehiculos-regstro.component';
import { VehiculosEditarComponent } from './pages/vehiculos_component/vehiculos-editar/vehiculos-editar.component';
import { RegistroMantenimientoComponent } from './pages/mantenimiento_component/registro_mantenimiento/registro-mantenimiento.component';
import { ActualizarMantenimientoComponent } from './pages/mantenimiento_component/actualizar_mantenimiento/actualizar-mantenimiento.component';
import { CitaActualizarComponent } from './pages/citas_component/cita-actualizar/cita-actualizar.component';
import { ActualizarUsuarioComponent } from './pages/usuarios_component/actualizar-usuario/actualizar-usuario.component';


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
    UsuariosRegistrerComponent,
    VehiculosRegstroComponent,
    VehiculosEditarComponent,
    RegistroMantenimientoComponent,
    ActualizarMantenimientoComponent,
    CitaActualizarComponent,
    ActualizarUsuarioComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
