import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculosDetallesComponent } from './vehiculos-detalles.component';

describe('VehiculosDetallesComponent', () => {
  let component: VehiculosDetallesComponent;
  let fixture: ComponentFixture<VehiculosDetallesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehiculosDetallesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehiculosDetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
