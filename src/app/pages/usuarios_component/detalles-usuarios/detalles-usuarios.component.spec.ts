import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesUsuariosComponent } from './detalles-usuarios.component';

describe('DetallesUsuariosComponent', () => {
  let component: DetallesUsuariosComponent;
  let fixture: ComponentFixture<DetallesUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallesUsuariosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallesUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
