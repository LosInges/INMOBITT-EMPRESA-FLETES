import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Iniciar sesión', url: '/login', icon: 'log-in' },
    { title: 'Transportes', url: '/transportes', icon: 'warning' },
    { title: 'Cargadores', url: '/cargadores', icon: 'warning' },
  ];

  public secondAppPages = [
    { title: 'Fletes_Jaz', url: '/fletes', icon: 'bus-outline' },
    { title: 'Precarga', url: '/precarga', icon: 'heart' },
    { title: 'Paquetes', url: '/fletes/1/paquetes', icon: 'archive' },
    { title: 'Trash', url: '/fletes/1/paquetes/1/items', icon: 'trash' },
    { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];
  constructor() {}
}
