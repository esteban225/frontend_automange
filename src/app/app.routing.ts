import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { productosComponent } from "./pages/productos_components/productos/productos.component";
import { productosRegistroComponent } from './pages/productos_components/productosRegistro/productosRegistro.component';
import { productosActualizarComponent } from './pages/productos_components/productosActualizar/productosActualizar.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }, {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
      }
    ]
  }, {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/layouts/auth-layout/auth-layout.module').then(m => m.AuthLayoutModule)
      }
    ]
  },
  //nuevas rutas 
  {
    path: 'productos',
    component: productosComponent
  },
  {
    path: 'productosRegistro',
    component: productosRegistroComponent
  },
  {
    path: 'productosActualizar/:id',
    component: productosActualizarComponent
  },
  { 
    path: 'vehiculos',
    redirectTo: 'dashboard'
  },
  {
    path: 'mantenimientos',
    redirectTo: 'dashboard'
  }, {
    path: '**',
    redirectTo: 'dashboard'
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
