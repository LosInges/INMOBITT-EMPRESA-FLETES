import { Component, OnInit } from '@angular/core';
import { Estado } from 'src/app/interfaces/estado';
import { EstadosService } from 'src/app/services/estados.service';
import { Precarga } from '../interfaces/precarga';
import { PrecargaService } from '../services/precarga.service';

@Component({
  selector: 'app-precargas',
  templateUrl: './precargas.component.html',
  styleUrls: ['./precargas.component.scss'],
})
export class PrecargasComponent implements OnInit {
  estados: Estado[] = this.estadosService.getEstados();
  precargas?: Precarga[];
  constructor(
    private estadosService: EstadosService,
    private precargaService: PrecargaService
  ) {}

  ngOnInit() {
    this.precargaService
      .getPrecargas('empresa@mail.com')
      .subscribe((precargas) => {
        this.precargas = precargas;
        console.log(this.precargas);
      });
  }
}
