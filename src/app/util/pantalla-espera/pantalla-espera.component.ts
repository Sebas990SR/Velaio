import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pantalla-espera',
  templateUrl: './pantalla-espera.component.html',
  styleUrls: ['./pantalla-espera.component.css']
})
export class PantallaEsperaComponent {
  
  constructor() {
  }

  ngOnInit() {
  }

  activarModoEspera() {
    document.getElementById('esperaModal')?.classList.add('show');
    document.getElementById('esperaModal')?.classList.remove('hide');
  }

  desactivarModoEspera() {
    document.getElementById('esperaModal')?.classList.add('hide');
    document.getElementById('esperaModal')?.classList.remove('show');
  }

}
