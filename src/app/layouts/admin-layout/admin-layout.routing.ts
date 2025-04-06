import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';

import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { ProductosComponent } from 'src/app/pages/productos_components/productos/productos.component';
import { ProductosRegistroComponent } from 'src/app/pages/productos_components/productosRegistro/productosRegistro.component';
import { ProductosActualizarComponent } from 'src/app/pages/productos_components/productosActualizar/productosActualizar.component';
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
import { AuthGuard } from "src/app/service/auth_guard/auth.guard";
import { ProductosDetallesComponent } from 'src/app/pages/productos_components/productos-detalles/productos-detalles.component';
import { VehiculosDetallesComponent } from 'src/app/pages/vehiculos_component/vehiculos-detalles/vehiculos-detalles.component';
import { DetallesUsuariosComponent } from 'src/app/pages/usuarios_component/detalles-usuarios/detalles-usuarios.component';
import { DetallesMantenimientoComponent } from 'src/app/pages/mantenimiento_component/detalles-mantenimiento/detalles-mantenimiento.component';


export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent  },
    { path: 'user-profile', component: UserProfileComponent },


    //rutas nuevas productos
    { path: 'productos', component: ProductosComponent, canActivate:[AuthGuard] },
    { path: 'productosRegistro', component: ProductosRegistroComponent, canActivate:[AuthGuard]},
    { path: 'productosActualizar/:id', component: ProductosActualizarComponent, canActivate:[AuthGuard] },
    { path: 'productosDetalles/:id', component: ProductosDetallesComponent, canActivate:[AuthGuard] },

    //rutas nuevas mantenimientos
    { path: 'mantenimientos', component: MantenimientoComponent, canActivate:[AuthGuard] },
    { path: 'mantenimientosRegistro/:id', component: RegistroMantenimientoComponent, canActivate:[AuthGuard] },
    { path: 'mantenimientosActualizar/:id', component: ActualizarMantenimientoComponent, canActivate:[AuthGuard] },
    { path: 'mantenimientosDetalle/:id', component: DetallesMantenimientoComponent, canActivate:[AuthGuard] },


    //rutas nuevas vehiculos
    { path: 'vehiculos', component: VehiculosComponent, canActivate:[AuthGuard] },
    { path: 'vehiculosRegistro', component: VehiculosRegstroComponent, canActivate:[AuthGuard]},
    { path: 'vehiculosActualizar/:id', component: VehiculosEditarComponent, canActivate:[AuthGuard] },
    { path: 'vehiculosDetalles/:id', component: VehiculosDetallesComponent, canActivate:[AuthGuard] },

    //rutas nuevas citas
    { path: 'citas', component: CitasComponent, canActivate:[AuthGuard] },
     { path: 'citasRegistro', component: ProductosRegistroComponent, canActivate:[AuthGuard] },
    { path: 'citasActualizar/:id', component: CitaActualizarComponent, canActivate:[AuthGuard] },

    //rutas nuevas usuarios
    { path: 'usuarios', component: UsuariosComponent, canActivate:[AuthGuard] },
    { path: 'usuariosRegistro', component: UsuariosRegistrerComponent, canActivate:[AuthGuard] },
    { path: 'usuariosActualizar/:id', component:ActualizarUsuarioComponent, canActivate:[AuthGuard] },
    { path: 'usuariosDetalles/:id', component:DetallesUsuariosComponent, canActivate:[AuthGuard] },

];
