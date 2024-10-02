import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreacionTareasComponent } from './creacion-tareas.component';

describe('CreacionTareasComponent', () => {
  let component: CreacionTareasComponent;
  let fixture: ComponentFixture<CreacionTareasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreacionTareasComponent]
    });
    fixture = TestBed.createComponent(CreacionTareasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
