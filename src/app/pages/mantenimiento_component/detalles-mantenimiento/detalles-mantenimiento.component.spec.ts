import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesMantenimientoComponent } from './detalles-mantenimiento.component';

describe('DetallesMantenimientoComponent', () => {
  let component: DetallesMantenimientoComponent;
  let fixture: ComponentFixture<DetallesMantenimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallesMantenimientoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallesMantenimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
