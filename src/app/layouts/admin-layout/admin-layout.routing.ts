import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { productosComponent } from 'src/app/pages/productos_components/productos/productos.component';
import { productosRegistroComponent } from 'src/app/pages/productos_components/productosRegistro/productosRegistro.component';
import { productosActualizarComponent } from 'src/app/pages/productos_components/productosActualizar/productosActualizar.component';
import { MantenimientoComponent } from 'src/app/pages/mantenimiento_component/mantenimiento/mantenimiento.component';
import { RegistroMantenimientoComponent } from 'src/app/pages/mantenimiento_component/registro_mantenimiento/registro-mantenimiento.component';
import { ActualizarMantenimientoComponent } from 'src/app/pages/mantenimiento_component/actualizar_mantenimiento/actualizar-mantenimiento.component';
import { VehiculosComponent } from 'src/app/pages/vehiculos_component/vehiculos/vehiculos.component';
import { VehiculosRegstroComponent } from 'src/app/pages/vehiculos_component/vehiculos-regstro/vehiculos-regstro.component';
import { VehiculosEditarComponent } from 'src/app/pages/vehiculos_component/vehiculos-editar/vehiculos-editar.component';
import { CitasComponent } from 'src/app/pages/citas_component/citas/citas.component';
import { CitaActualizarComponent } from 'src/app/pages/citas_component/cita-actualizar/cita-actualizar.component';
import { UsuariosComponent } from 'src/app/pages/usuarios_component/usuarios/usuarios.component';
import { UsuariosRegistrerComponent } from 'src/app/pages/usuarios_component/usuarios-registrer/usuarios-registrer.component';
import { ActualizarUsuarioComponent } from 'src/app/pages/usuarios_component/actualizar-usuario/actualizar-usuario.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'user-profile', component: UserProfileComponent },
    { path: 'tables', component: TablesComponent },
    { path: 'icons', component: IconsComponent },
    { path: 'maps', component: MapsComponent },
    { path: 'maps', component: MapsComponent },

    //rutas nuevas productos
    { path: 'productos', component: productosComponent },
    { path: 'productosRegistro', component: productosRegistroComponent },
    { path: 'productosAtualizar/:id', component: productosActualizarComponent },

    //rutas nuevas mantenimientos
    { path: 'mantenimientos', component: MantenimientoComponent },
    { path: 'mantenimientosRegistro', component: RegistroMantenimientoComponent },
    { path: 'mantenimientosAtualizar/:id', component: ActualizarMantenimientoComponent },

    //rutas nuevas vehiculos
    { path: 'vehiculos', component: VehiculosComponent },
    { path: 'vehiculosRegistro', component: VehiculosRegstroComponent },
    { path: 'vehiculosAtualizar/:id', component: VehiculosEditarComponent },

    //rutas nuevas citas
    { path: 'citas', component: CitasComponent },
     { path: 'citasRegistro', component: productosRegistroComponent },
    { path: 'citasAtualizar/:id', component: CitaActualizarComponent },

    //rutas nuevas usuarios
    { path: 'usuarios', component: UsuariosComponent },
    { path: 'usuariosRegistro', component: UsuariosRegistrerComponent },
    { path: 'usuariosAtualizar/:id', component:ActualizarUsuarioComponent }
];
