import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroMantenimientoComponent } from './registro-mantenimiento.component';

describe('RegistroMantenimientoComponent', () => {
  let component: RegistroMantenimientoComponent;
  let fixture: ComponentFixture<RegistroMantenimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroMantenimientoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroMantenimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
