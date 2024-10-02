import { afterNextRender, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GestionService } from '../services/gestion.service';
import { PantallaEsperaComponent } from '../util/pantalla-espera/pantalla-espera.component';
declare var window: any;

@Component({
  selector: 'app-creacion-tareas',
  templateUrl: './creacion-tareas.component.html',
  styleUrls: ['./creacion-tareas.component.css']
})
export class CreacionTareasComponent implements OnInit{

  @Input() dataEdicion: any;
  @Input() actualizarDatos: boolean;
  @Output() desplegarMenuPrincipal = new EventEmitter();
  @Output() desplegarListaTareas = new EventEmitter();

  protected formularioTarea: FormGroup;
  protected formularioPersona: FormGroup;

  protected arregloPersonasParcial: any = [];
  protected arregloHabilidadesParcial: any = [];
  protected modalAlerta: any;

  protected habilitarFormPersona: boolean;
  protected habilitarGuardarPersona: boolean;
  protected habilitarGuardarTarea: boolean;

  @ViewChild(PantallaEsperaComponent, {static: false}) pantallaEspera: PantallaEsperaComponent | undefined;

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar, private servicioTareas: GestionService){

    afterNextRender(() => {
      this.modalAlerta = new window.bootstrap.Modal(document.getElementById('modalAlerta'), {
        keyboard: false, backdrop: 'static'
      });
    });
    
    this.actualizarDatos = false;

    this.formularioTarea = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      fecha_limite: new FormControl(null, Validators.required),
    });

    this.formularioPersona = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      edad: new FormControl(null, Validators.required),
      habilidades: this.fb.array([]),
    });

    this.habilitarFormPersona = false;
    this.habilitarGuardarPersona = false;
    this.habilitarGuardarTarea = false;
  }

  ngOnInit(): void {
    this.validarInicial();
  }

  openModal(){
    this.modalAlerta.show();
  }

  protected validarInicial(){
    this.pantallaEspera?.activarModoEspera();
    if(this.actualizarDatos){
      this.setFormulario();
    } else {

      setTimeout(() =>{
        this.pantallaEspera?.desactivarModoEspera();
      }, 100);

    }

  }

  protected setFormulario(){
    this.t['nombre'].setValue(this.dataEdicion.nombre);
    this.t['fecha_limite'].setValue(this.dataEdicion.fecha_limite);
    this.arregloPersonasParcial = this.dataEdicion.personas;

    setTimeout(() =>{
      this.pantallaEspera?.desactivarModoEspera();
    }, 100);
  }

  protected validarFormularioTarea(){
    if(this.formularioTarea.valid && this.arregloPersonasParcial.length > 0){
      this.habilitarGuardarTarea = true;
    } else{
      this.habilitarGuardarTarea = false;
    }
  }

  protected validarFormularioPersona(){

    if(this.formularioPersona.valid && this.habilidades.length > 0){
      this.habilitarGuardarPersona = true;
    } else{
      this.habilitarGuardarPersona = false;
    }

    this.validarFormularioTarea();
  }

  protected guardarTarea(){
    this.pantallaEspera?.activarModoEspera();
    this.consolidarInformacion();
  }

  protected consolidarInformacion(){
    var data: any;

    if(!this.actualizarDatos){

      data = this.formularioTarea.value;
      data.completada = false;
      data.personas = this.arregloPersonasParcial;

      let promesa: any;
      promesa = this.servicioTareas.insertarTarea(data);

      promesa.then(() =>{
        this.snackBar.open('Tarea registrada correctamente', 'Cerrar', { duration: 4000 });
        this.formularioPersona.reset();
        this.formularioTarea.reset();
        this.arregloPersonasParcial = [];
        this.habilidades.clear();
        this.habilitarFormPersona = false;
        this.habilitarGuardarPersona = false;
        this.habilitarGuardarTarea = false;
        setTimeout(() =>{
          this.pantallaEspera?.desactivarModoEspera();
        }, 100);
      }). catch(() =>{
        this.snackBar.open('Error al registrar la tarea', 'Cerrar', { duration: 4000 });
        setTimeout(() =>{
          this.pantallaEspera?.desactivarModoEspera();
        }, 100);
      });

    } else {

      data = this.formularioTarea.value;
      data.id = this.dataEdicion.id;
      data.completada = this.dataEdicion.completada;
      data.personas = this.arregloPersonasParcial;

      let promesa: any;
      promesa = this.servicioTareas.editartarea(data);

      promesa.then(() =>{
        this.snackBar.open('Tarea actualizada correctamente', 'Cerrar', { duration: 4000 });
        this.desplegarListaTareas.emit();
        setTimeout(() =>{
          this.pantallaEspera?.desactivarModoEspera();
        }, 100);
        
      }). catch(() =>{
        this.snackBar.open('Error al actualizar la tarea', 'Cerrar', { duration: 4000 });
        setTimeout(() =>{
          this.pantallaEspera?.desactivarModoEspera();
        }, 100);
      });

    }

  }

  protected guardarPersona(){

    let promesa: any;
    promesa = this.validarNombre();
    promesa.then(() =>{
      this.arregloPersonasParcial.push(this.formularioPersona.value);
      setTimeout(() =>{
        this.habilidades.clear();
        this.formularioPersona.reset();
        this.habilitarGuardarPersona = false;
        this.habilitarFormPersona = false;
        this.validarFormularioTarea();
      });
    }).catch(() =>{
      this.snackBar.open('Esta persona ya existe, por favor verifíque el nombre', 'Cerrar', { duration: 4000 });
    });

    
  }

  protected validarNombre(){

    return new Promise((resolve, reject) =>{

      const nombreRepetido = this.arregloPersonasParcial.find((persona: { nombre: string; }) => persona.nombre === this.formularioPersona.value.nombre);

      if(nombreRepetido){
        reject(false);
      } else {
        resolve(true);
      }

    });

  }

  protected eliminarPersona(i: number){
    this.arregloPersonasParcial.splice(i, 1);
    this.validarFormularioTarea();
  }

  protected validarEdad(){
    if(this.p['edad'].value !== null){
      if(this.p['edad'].value < 18){
        this.snackBar.open('La edad debe ser mayor o igual a 18', 'Cerrar', { duration: 4000 });
        this.p['edad'].setValue(null);
      }
    }
  }

  protected agregarPersona(){
    this.formularioPersona.reset();
    this.habilitarFormPersona = true;
  }

  get t() { return this.formularioTarea.controls}
  get p() { return this.formularioPersona.controls}

  get habilidades(): FormArray {
    return this.formularioPersona.get('habilidades') as FormArray;
  }
  
  get g() { return this.habilidades.controls; }

  protected agregarHabilidad() {
    const habilidad = this.fb.group({
      descripcion: ['', Validators.required]
    });
    this.habilidades.push(habilidad);
    this.validarFormularioPersona();
  }

  protected eliminarHabilidad(index: number) {
    this.habilidades.removeAt(index);
    this.validarFormularioPersona();
  }

  protected volver(){
    this.desplegarMenuPrincipal.emit();
  }
}
