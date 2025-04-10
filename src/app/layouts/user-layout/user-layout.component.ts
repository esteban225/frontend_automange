import { Component, OnInit } from '@angular/core';
import { ComponentsModule } from "../../components/components.module";
import { RouterModule } from '@angular/router';

@Component({

  standalone: true,
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.scss'],
  imports: [ComponentsModule,
    RouterModule
  ]
})
export class UserLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
