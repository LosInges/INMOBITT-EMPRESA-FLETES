import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Inicio', url: '/inicio', icon: 'home-outline' },
    { title: 'Inbox', url: '/folder/Inbox', icon: 'logo-octocat' },
    { title: 'Outbox', url: '/folder/Outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];

  public secondAppPages =[
    { title: 'Login', url: '/login', icon:"logo-octocat"
  },
   { title: 'Sing Up', url: '/signup', icon: "person-add"},
   { title: 'Fletes_Jaz', url: '/fletes', icon: 'bus-outline' },
   { title: 'Precarga', url: '/precarga', icon: 'heart' },
   { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
   { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
   { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ]
  constructor() {}
}
