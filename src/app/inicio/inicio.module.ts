import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './inicio.component';
import { ListadoTareasModule } from '../listado-tareas/listado-tareas.module';
import { CreacionTareasModule } from '../creacion-tareas/creacion-tareas.module';
import { PantallaEsperaModule } from '../util/pantalla-espera/pantalla-espera.module';



@NgModule({
  declarations: [
    InicioComponent
  ],
  imports: [
    CommonModule,

    ListadoTareasModule,
    CreacionTareasModule,
    PantallaEsperaModule
  ]
})
export class InicioModule { }
