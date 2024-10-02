import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PantallaEsperaComponent } from './pantalla-espera.component';

describe('PantallaEsperaComponent', () => {
  let component: PantallaEsperaComponent;
  let fixture: ComponentFixture<PantallaEsperaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PantallaEsperaComponent]
    });
    fixture = TestBed.createComponent(PantallaEsperaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
