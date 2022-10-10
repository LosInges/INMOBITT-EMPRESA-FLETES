import { Component, OnInit } from '@angular/core';
import { Transporte } from 'src/app/fletes/interfaces/transporte';
import { TransportesService } from 'src/app/fletes/services/transportes.service';

@Component({
  selector: 'app-alta',
  templateUrl: './alta.component.html',
  styleUrls: ['./alta.component.scss'],
})
export class AltaComponent implements OnInit {
  transporte: Transporte = {
    matricula: '',
    capacidad: 0,
    empresa: 'empresa@mail.com',
    activo: true,
  };

  constructor(private transportesService: TransportesService) {}

  ngOnInit() {}

  registrarTransporte() {
    this.transportesService
      .postTransporte(this.transporte)
      .subscribe((transporte) => console.log(transporte));
  }
}
