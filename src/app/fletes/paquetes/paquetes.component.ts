import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-paquetes',
  templateUrl: './paquetes.component.html',
  styleUrls: ['./paquetes.component.scss'],
})
export class PaquetesComponent implements OnInit {
  id: string;

  constructor(private router: Router) {}

  ngOnInit() {}

  cambiarId() {
    this.id = uuidv4();
    this.router.navigate([this.router.url, this.id, 'items']);
  }
}
