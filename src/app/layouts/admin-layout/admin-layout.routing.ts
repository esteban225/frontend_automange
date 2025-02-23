import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { productosComponent } from 'src/app/pages/productos_components/productos/productos.component';
import { productosRegistroComponent } from 'src/app/pages/productos_components/productosRegistro/productosRegistro.component';
import { productosActualizarComponent } from 'src/app/pages/productos_components/productosActualizar/productosActualizar.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'user-profile', component: UserProfileComponent },
    { path: 'tables', component: TablesComponent },
    { path: 'icons', component: IconsComponent },
    { path: 'maps', component: MapsComponent },
    { path: 'maps', component: MapsComponent },

    //rutas nuevas
    { path: 'productos', component: productosComponent },
    { path: 'productosRegistro', component: productosRegistroComponent },
    { path: 'productosAtualizar/:id', component:productosActualizarComponent }

];
