import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreacionTareasComponent } from './creacion-tareas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PantallaEsperaModule } from '../util/pantalla-espera/pantalla-espera.module';



@NgModule({
  declarations: [
    CreacionTareasComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatSnackBarModule,
    PantallaEsperaModule
  ],
  exports: [
    CreacionTareasComponent
  ]
})
export class CreacionTareasModule { }
