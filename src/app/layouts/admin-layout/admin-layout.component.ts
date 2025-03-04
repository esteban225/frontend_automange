import { Component, OnInit } from '@angular/core';
import { ComponentsModule } from "../../components/components.module";
import { RouterModule } from '@angular/router';

@Component({

  standalone: true,
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
  imports: [ComponentsModule,
    RouterModule
  ]
})
export class AdminLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
