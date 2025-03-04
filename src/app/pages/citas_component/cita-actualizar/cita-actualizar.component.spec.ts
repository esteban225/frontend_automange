import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitaActualizarComponent } from './cita-actualizar.component';

describe('CitaActualizarComponent', () => {
  let component: CitaActualizarComponent;
  let fixture: ComponentFixture<CitaActualizarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CitaActualizarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitaActualizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
