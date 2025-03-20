import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  children?: RouteInfo[];
}
export const ROUTES: RouteInfo[] = [

  { path: '/admin/dashboard', title: 'Administrador', icon: 'ni-tv-2 text-primary', class: '' },
  {
    path: '',
    title: 'Productos',
    icon: 'ni ni-box-2 text-orange', 
    class: '',
    children: [
      { path: '/admin/productos', title: 'Lista ', icon: 'ni ni-bullet-list-67 text-orange', class: '' }, 
      { path: '/admin/productosRegistro', title: 'Registro ', icon: 'ni ni-fat-add text-orange', class: '' },
    ]
  },
  {
    path: '',
    title: 'Vehículos',
    icon: 'ni ni-delivery-fast text-blue', 
    class: '',
    children: [
      { path: '/admin/vehiculos', title: 'Lista ', icon: 'ni ni-bullet-list-67 text-blue', class: '' }, 
      { path: '/admin/vehiculosRegistro', title: 'Registro ', icon: 'ni ni-fat-add text-orange', class: '' },
      { path: '/admin/mantenimientos', title: 'Mantenimientos', icon: 'ni ni-settings text-blue', class: '' }, 
      { path: '/admin/citas', title: 'Citas', icon: 'ni ni-calendar-grid-58 text-orange', class: '' }, 
    ]
  },
  {
    path: '',
    title: 'Usuarios',
    icon: 'ni ni-circle-08 text-yellow', 
    class: '',
    children: [
      { path: '/admin/usuarios', title: 'Lista de usuarios', icon: 'ni ni-bullet-list-67 text-yellow', class: '' }, 
      { path: '/admin/usuariosRegistro', title: 'Crear usuario', icon: 'ni ni-single-02 text-green', class: '' },
      { path: '/admin/citasRegistro', title: 'Registro de cita', icon: 'ni ni-fat-add text-blue', class: '' }
    ]
  }
  
  // { path: '/dashboard', title: 'Administrador', icon: 'ni-tv-2 text-primary', class: '' },
  // { path: '/icons', title: 'Icons', icon: 'ni-planet text-blue', class: '' },
  // { path: '/maps', title: 'Maps', icon: 'ni-pin-3 text-orange', class: '' },
  // { path: '/user-profile', title: 'User profile', icon: 'ni-single-02 text-yellow', class: '' },
  // { path: '/tables', title: 'Tables', icon: 'ni-bullet-list-67 text-red', class: '' },
  // { path: '/login', title: 'Login', icon: 'ni-key-25 text-info', class: '' },
  // { path: '/register', title: 'Register', icon: 'ni-circle-08 text-pink', class: '' },
  //Componenetes de login usuario
  // { path: '/loginUser', title: 'Login user', icon: 'ni-key-25 text-info', class: '' },
  // { path: '/registerUser', title: 'Register user', icon: 'ni-circle-08 text-pink', class: '' },
  //componentes nuevos productos
  // { path: '/productos', title: 'Productos', icon: 'ni ni-cart text-orange', class: '' },
  // { path: '/productosRegistro', title: 'Registro de productos', icon: 'ni ni-cart text-orange', class: '' },
  //componentes nuevos vehiculos
  // { path: '/vehiculos', title: 'Vehículos', icon: ' ni ni-bus-front-12 text-blue', class: '' },
  // { path: '/mantenimientos', title: 'Mantenimientos', icon: ' ni ni-settings text-pink', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public menuItems: any[];
  public isCollapsed = true;
  public expandedMenus: { [key: string]: boolean } = {}; // Controla qué menú está expandido

  constructor(private readonly router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES;
    this.router.events.subscribe(() => {
      this.isCollapsed = true;
    });
  }

  toggleMenu(title: string) {

    if (this.expandedMenus[title]) {
      this.expandedMenus[title] = false;
    } else {

      Object.keys(this.expandedMenus).forEach(key => {
        this.expandedMenus[key] = false;
      });
      this.expandedMenus[title] = true;
    }
  }
  
}
