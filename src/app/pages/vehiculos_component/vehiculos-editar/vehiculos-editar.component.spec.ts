import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculosEditarComponent } from './vehiculos-editar.component';

describe('VehiculosEditarComponent', () => {
  let component: VehiculosEditarComponent;
  let fixture: ComponentFixture<VehiculosEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehiculosEditarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehiculosEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
