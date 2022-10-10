import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Iniciar sesión', url: '/login', icon: 'log-in' },
    { title: 'Transportes', url: '/transportes', icon: 'car-outline' },
    { title: 'Cargadores', url: '/cargadores', icon: 'people-circle-outline' },
    { title: 'Fletes', url: '/fletes', icon: 'bus-outline' },
  ];
  constructor() {}
}
