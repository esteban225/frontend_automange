import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculosRegstroComponent } from './vehiculos-regstro.component';

describe('VehiculosRegstroComponent', () => {
  let component: VehiculosRegstroComponent;
  let fixture: ComponentFixture<VehiculosRegstroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehiculosRegstroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehiculosRegstroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
