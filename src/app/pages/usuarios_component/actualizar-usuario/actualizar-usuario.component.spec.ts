import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarUsuarioComponent } from './actualizar-usuario.component';

describe('ActualizarUsuarioComponent', () => {
  let component: ActualizarUsuarioComponent;
  let fixture: ComponentFixture<ActualizarUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizarUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
