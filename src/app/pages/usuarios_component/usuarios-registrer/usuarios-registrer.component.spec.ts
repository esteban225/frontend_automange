import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosRegistrerComponent } from './usuarios-registrer.component';

describe('UsuariosRegistrerComponent', () => {
  let component: UsuariosRegistrerComponent;
  let fixture: ComponentFixture<UsuariosRegistrerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuariosRegistrerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuariosRegistrerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
