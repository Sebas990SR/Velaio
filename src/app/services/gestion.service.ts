import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GestionService {

  protected arregloTareas: any = [];
  protected arregloTareasFiltrado: any = [];

  constructor() {
    this.arregloTareas = [
      {
          "id": 1,
          "nombre": "Tarea 1",
          "fecha_limite": "2024-12-12",
          "completada": false,
          "personas": [
              {
                  "nombre": "Sebas",
                  "edad": 24,
                  "habilidades": [
                      {
                          "descripcion": "js"
                      },
                      {
                          "descripcion": "php"
                      }
                  ]
              },
              {
                  "nombre": "Andres",
                  "edad": 25,
                  "habilidades": [
                      {
                          "descripcion": "css"
                      },
                      {
                          "descripcion": "html"
                      }
                  ]
              }
          ]
      },
      {
          "id": 2,
          "nombre": "Tarea 2",
          "fecha_limite": "2024-10-22",
          "completada": false,
          "personas": [
              {
                  "nombre": "Juan",
                  "edad": 27,
                  "habilidades": [
                      {
                          "descripcion": "ts"
                      }
                  ]
              }
          ]
      }
    ]

    this.arregloTareasFiltrado = this.arregloTareas;
  }

  insertarTarea(data: any){

    var longitud: number = 0;
    
    longitud = this.arregloTareas.length;

    data.id = this.arregloTareas.length + 1;

    return new Promise((resolve, reject) => { 
      this.arregloTareas.push(data);

      setTimeout(() =>{
        if(longitud < this.arregloTareas!.length){
          resolve(true);
        } else {
          reject(false);
        }
      });
      
    });

  }

  consultarTareas(){

    return this.arregloTareas;

  }

  actualizarTarea(i: number, estado: boolean){

    this.arregloTareasFiltrado[i].completada = estado;

  }

  filtrarTareas(filtro: string){

    switch (filtro){
      case 'todas':
        this.arregloTareasFiltrado = this.arregloTareas;
        return this.arregloTareasFiltrado
        break;
      case 'completadas':
        this.arregloTareasFiltrado = this.arregloTareas.filter((tarea: any) => {
          return tarea.completada === true;
        });
        return this.arregloTareasFiltrado;
        break;
      case 'pendientes':
        this.arregloTareasFiltrado = this.arregloTareas.filter((tarea: any) => {
          return tarea.completada === false;
        })
        return this.arregloTareasFiltrado
        break;
    }

  }

  eliminarTarea(i: number){

    const indice = this.arregloTareasFiltrado.findIndex((tarea: { id: any; }) => tarea.id === i);
    if (indice !== -1) {
      this.arregloTareasFiltrado.splice(indice, 1);
    }

    const indice2 = this.arregloTareas.findIndex((tarea: { id: any; }) => tarea.id === i);
    if (indice2 !== -1) {
      this.arregloTareas.splice(indice2, 1);
    }
  }

  editartarea(data: any){

    return new Promise((resolve, reject) => {
      const tareaActualizar = this.arregloTareas.find((tarea: { id: number; }) => tarea.id === data.id);

      if (tareaActualizar) {
        tareaActualizar.nombre = data.nombre;
        tareaActualizar.fecha_limite = data.fecha_limite;
        tareaActualizar.personas = data.personas;
        resolve(true);
      } else {
        reject(false);
      }
    });
  }
}
