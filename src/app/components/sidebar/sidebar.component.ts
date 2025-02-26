import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard', icon: 'ni-tv-2 text-primary', class: '' },
  { path: '/icons', title: 'Icons', icon: 'ni-planet text-blue', class: '' },
  { path: '/maps', title: 'Maps', icon: 'ni-pin-3 text-orange', class: '' },
  { path: '/user-profile', title: 'User profile', icon: 'ni-single-02 text-yellow', class: '' },
  { path: '/tables', title: 'Tables', icon: 'ni-bullet-list-67 text-red', class: '' },
  { path: '/login', title: 'Login', icon: 'ni-key-25 text-info', class: '' },
  { path: '/register', title: 'Register', icon: 'ni-circle-08 text-pink', class: '' },
  //Componenetes de login usuario
  { path: '/loginUser', title: 'Login user', icon: 'ni-key-25 text-info', class: '' },
  { path: '/registerUser', title: 'Register user', icon: 'ni-circle-08 text-pink', class: '' },

  //componentes nuevos productos
  { path: '/productos', title: 'Productos', icon: 'ni ni-cart text-orange', class: '' },
  { path: '/productosRegistro', title: 'Registro de productos', icon: 'ni ni-cart text-orange', class: '' },

  //componentes nuevos vehiculos
  { path: '/vehiculos', title: 'Vehículos', icon: ' ni ni-bus-front-12 text-blue', class: '' },
  { path: '/mantenimientos', title: 'Mantenimientos', icon: ' ni ni-settings text-pink', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
  }
}
