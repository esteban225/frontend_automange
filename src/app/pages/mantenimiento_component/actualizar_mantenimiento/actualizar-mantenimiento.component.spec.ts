import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarMantenimientoComponent } from './actualizar-mantenimiento.component';

describe('ActualizarMantenimientoComponent', () => {
  let component: ActualizarMantenimientoComponent;
  let fixture: ComponentFixture<ActualizarMantenimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizarMantenimientoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarMantenimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
