import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { productosActualizarComponent } from './productosActualizar.component';

describe('RegisterComponent', () => {
  let component: productosActualizarComponent;
  let fixture: ComponentFixture<productosActualizarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ productosActualizarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(productosActualizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
