import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Cargador } from '../../interfaces/cargador';
import { Transporte } from '../../interfaces/transporte';
import { CargadoresService } from '../../services/cargadores.service';
import { TransporteFleteService } from '../../services/transporte-flete.service';
@Component({
  selector: 'app-info-paquetes',
  templateUrl: './info-paquetes.component.html',
  styleUrls: ['./info-paquetes.component.scss'],
})
export class InfoPaquetesComponent implements OnInit {
  @Input() flete: string;
  cargadores: Cargador[] = [];
  transporte: string;
  cargadoresEmpresa: Cargador[] = [];

  constructor(
    private modalController: ModalController,
    private transporteFletesService: TransporteFleteService,
    private cargadoresService: CargadoresService
  ) {}

  ngOnInit() {
    this.transporteFletesService
      .getTransportesFlete(this.flete)
      .subscribe((transporteFlete) => {
        this.transporte = transporteFlete.transporte;
        transporteFlete.cargadores.forEach((cargador) => {
          if (this.cargadores)
            this.cargadoresService
              .getCargador('empresa@mail.com', cargador)
              .subscribe((c) => (this.cargadores = [c]));
          else
            this.cargadoresService
              .getCargador('empresa@mail.com', cargador)
              .subscribe((c) => this.cargadores.push(c));
        });
      });

      this.cargadoresService.getCargadores('empresa@mail.com').subscribe((c) =>
        this.cargadoresEmpresa = c

      )
  }

  cerrar() {
    return this.modalController.dismiss();
  }

  eliminar(cargador: string) {}

  agregar() {}
}
