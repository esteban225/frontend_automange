import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  constructor(location: Location,  private readonly element: ElementRef, private readonly router: Router) {
    this.location = location;
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
  }
  getTitle() {
    // Obtén la ruta actual procesada
    let titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.startsWith('#')) {
      titlee = titlee.slice(1); // Elimina el '#' si existe
    }
  
    // Lógica para buscar recursivamente en las rutas, incluyendo hijos
    const findTitle = (routes) => {
      for (let route of routes) {
        // Si la ruta tiene hijos, buscar en ellos
        if (route.children && route.children.length > 0) {
          const childTitle = findTitle(route.children);
          if (childTitle) return childTitle;
        }
        // Comparar la ruta actual con la propiedad `path`
        if (route.path === titlee) {
          return route.title;
        }
      }
      return null; // Si no se encuentra en esta iteración
    };
  
    // Buscar el título en la lista de rutas
    const title = findTitle(ROUTES);
  
    // Si no se encuentra un título, retornar el predeterminado
    return title || 'Administrador';
  }

  CerrarSesion(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
