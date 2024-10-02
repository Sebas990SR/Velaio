import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InicioModule } from './inicio/inicio.module';
import { ListadoTareasModule } from './listado-tareas/listado-tareas.module';
import { CreacionTareasModule } from './creacion-tareas/creacion-tareas.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    InicioModule,
    ListadoTareasModule,
    CreacionTareasModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
