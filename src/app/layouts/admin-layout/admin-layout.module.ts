import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

//importes de nuevos componentes
import { ProductosComponent } from "../../pages/productos_components/productos/productos.component";
import { ProductosRegistroComponent } from 'src/app/pages/productos_components/productosRegistro/productosRegistro.component';
import { ProductosActualizarComponent } from 'src/app/pages/productos_components/productosActualizar/productosActualizar.component';

import { CitasComponent } from "../../pages/citas_component/citas/citas.component";
import { CitaActualizarComponent } from 'src/app/pages/citas_component/cita-actualizar/cita-actualizar.component';


import { MantenimientoComponent } from "../../pages/mantenimiento_component/mantenimiento/mantenimiento.component";
import { RegistroMantenimientoComponent } from 'src/app/pages/mantenimiento_component/registro_mantenimiento/registro-mantenimiento.component';
import { ActualizarMantenimientoComponent } from 'src/app/pages/mantenimiento_component/actualizar_mantenimiento/actualizar-mantenimiento.component';


import { UsuariosComponent } from "../../pages/usuarios_component/usuarios/usuarios.component";
import { UsuariosRegistrerComponent } from 'src/app/pages/usuarios_component/usuarios-registrer/usuarios-registrer.component';
import { ActualizarUsuarioComponent } from 'src/app/pages/usuarios_component/actualizar-usuario/actualizar-usuario.component';


import { VehiculosComponent } from "../../pages/vehiculos_component/vehiculos/vehiculos.component";
import { VehiculosRegstroComponent } from 'src/app/pages/vehiculos_component/vehiculos-regstro/vehiculos-regstro.component';
import { VehiculosEditarComponent } from 'src/app/pages/vehiculos_component/vehiculos-editar/vehiculos-editar.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductosDetallesComponent } from 'src/app/pages/productos_components/productos-detalles/productos-detalles.component';
import { VehiculosDetallesComponent } from 'src/app/pages/vehiculos_component/vehiculos-detalles/vehiculos-detalles.component';
import { DetallesUsuariosComponent } from 'src/app/pages/usuarios_component/detalles-usuarios/detalles-usuarios.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TablesComponent,
    IconsComponent,
    MapsComponent,
    ProductosComponent,
    ProductosRegistroComponent,
    ProductosActualizarComponent,
    ProductosDetallesComponent,
    UsuariosComponent,
    UsuariosRegistrerComponent,
    ActualizarUsuarioComponent,
    DetallesUsuariosComponent,
    CitasComponent,
    CitaActualizarComponent,
    MantenimientoComponent,
    RegistroMantenimientoComponent,
    ActualizarMantenimientoComponent,
    VehiculosComponent,
    VehiculosRegstroComponent,
    VehiculosEditarComponent,
    VehiculosDetallesComponent
  ]
})

export class AdminLayoutModule { }
