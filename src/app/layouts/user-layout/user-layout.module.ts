import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { UserLayoutRoutes } from './user-layout.routing';

import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(UserLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MatDialogModule
  ],
  exports: [] // Exportamos el componente si se usa en otros módulos
})
export class UserLayoutModule { 
  constructor() {
    console.log('AuthLayoutModule cargado');
  }
}
