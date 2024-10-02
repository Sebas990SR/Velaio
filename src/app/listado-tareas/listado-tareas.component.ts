import { afterNextRender, Component, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { GestionService } from '../services/gestion.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PantallaEsperaComponent } from '../util/pantalla-espera/pantalla-espera.component';
declare var window: any;

@Component({
  selector: 'app-listado-tareas',
  templateUrl: './listado-tareas.component.html',
  styleUrls: ['./listado-tareas.component.css']
})
export class ListadoTareasComponent implements OnInit{

  @Output() desplegarMenuPrincipal = new EventEmitter();
  @Output() abrirEdicionTarea = new EventEmitter();

  protected tareas: any;
  protected tareasFiltradas: any;
  protected ampliados: any[] = [];
  protected modalAlerta: any;

  protected textoBoton1: string = '';
  protected textoBoton2: string = '';

  isAmpliado: boolean = false;
  protected rerender: boolean;

  protected filtroActual: string;

  protected idEliminar: number | undefined;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.anchoPantalla();
  }

  @ViewChild(PantallaEsperaComponent, {static: false}) pantallaEspera: PantallaEsperaComponent | undefined;
  
  constructor(private tareasService: GestionService, private snackBar: MatSnackBar){

    this.ampliados = [
      true,
      false,
      false
    ];

    this.rerender = false;
    this.filtroActual = 'todas';
    this.anchoPantalla();

    afterNextRender(() => {
      this.modalAlerta = new window.bootstrap.Modal(document.getElementById('modalAlerta'), {
        keyboard: false, backdrop: 'static'
      });
    });
  }

  ngOnInit(): void {
    this.obtenerTareas();
  }

  protected editarTarea(i: number){
    const indice = this.tareas.findIndex((tarea: { id: any; }) => tarea.id === i);
    if (indice !== -1) {
      this.abrirEdicionTarea.emit(this.tareas[indice]);
    }
  }

  protected eliminarTarea(){
    this.tareasService.eliminarTarea(this.idEliminar!);
  }

  openModal(i: number){
    this.idEliminar = i;
    this.modalAlerta.show();
  }

  protected obtenerTareas(){
    this.tareas = this.tareasService.consultarTareas();
    this.tareasFiltradas = this.tareasService.consultarTareas();
    this.rerender = true;

    setTimeout(() =>{
      this.pantallaEspera?.desactivarModoEspera();
    }, 100);
  }

  protected cambiarEstado(i: number, estado: boolean){
    this.rerender = false;
    this.tareasService.actualizarTarea(i, estado);

    setTimeout(() =>{
      this.snackBar.open('Tarea actualizada correctamente', 'Cerrar', { duration: 4000 });
      this.tareasFiltradas = this.tareasService.filtrarTareas(this.filtroActual);
      this.rerender = true;
    }, 100);
  }

  protected aplicarFiltro(filtro: string){

    this.tareasFiltradas = this.tareasService.filtrarTareas(filtro);
    this.filtroActual = filtro;

  }

  protected volver(){
    this.desplegarMenuPrincipal.emit();
  }

  protected onBotonClick(i: number): void {
    for (var x = 0; x < 3; x++) {
      if (i == x) {
        this.ampliados[x] = true;
      } else {
        this.ampliados[x] = false;
      }
    }
    this.isAmpliado = !this.isAmpliado;
  }

  anchoPantalla() {
    if (window.innerWidth >= 500) {
      this.textoBoton1 = '';
      this.textoBoton2 = '';
    } else {
      this.textoBoton1 = '  Cambiar a completado';
      this.textoBoton2 = '  Cambiar a pendiente';
    }
  }
}
