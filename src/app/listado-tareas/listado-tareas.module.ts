import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoTareasComponent } from './listado-tareas.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PantallaEsperaModule } from '../util/pantalla-espera/pantalla-espera.module';


@NgModule({
  declarations: [
    ListadoTareasComponent
  ],
  imports: [
    CommonModule,
    MatTooltipModule,
    ModalModule,
    PantallaEsperaModule
  ],
  exports: [
    ListadoTareasComponent
  ]
})
export class ListadoTareasModule { }
