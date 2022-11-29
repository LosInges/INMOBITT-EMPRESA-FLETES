import { Component, OnInit } from '@angular/core';
import { SessionService } from './services/session.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Transportes', url: '/transportes', icon: 'car-outline' },
    { title: 'Cargadores', url: '/cargadores', icon: 'people-circle-outline' },
    { title: 'Fletes', url: '/fletes', icon: 'bus-outline' },
    { title: 'Perfil', url: '/perfil', icon: 'person-outline' },
    {
      title: 'Cerrar Sesion',
      url: '',
      click: () => this.sesionService.clear(),
      icon: 'log-out-outline',
    },
  ];
  constructor(private sesionService: SessionService) {}

  click(funcion: any) {
    if (funcion) {
      funcion();
    }
  }
}
