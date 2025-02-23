import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { productosRegistroComponent } from './productosRegistro.component';

describe('RegisterComponent', () => {
  let component: productosRegistroComponent;
  let fixture: ComponentFixture<productosRegistroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ productosRegistroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(productosRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
