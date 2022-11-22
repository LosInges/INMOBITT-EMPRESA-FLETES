import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { AlertController, ModalController } from '@ionic/angular';
import { TransporteFlete } from '../interfaces/transporte-flete';
import { TransporteFleteService } from '../services/transporte-flete.service';
import { InfoPaquetesComponent } from './info-paquetes/info-paquetes.component';
import { PaquetesService } from '../services/paquetes.service';
import { environment } from 'src/environments/environment';
import { Item } from '../interfaces/item';

@Component({
  selector: 'app-paquetes',
  templateUrl: './paquetes.component.html',
  styleUrls: ['./paquetes.component.scss'],
})
export class PaquetesComponent implements OnInit {
  items: Item[] = [];
  total = 0;
  id: string;
  api = environment.api;
  transporteFlete: TransporteFlete = {
    flete: '',
    transporte: '',
    paquete: [],
    cargadores: [],
  };

  constructor(
    private router: Router,
    private modalController: ModalController,
    private activedRoute: ActivatedRoute,
    private transporteFleteService: TransporteFleteService,
    private paquetesService: PaquetesService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.activedRoute.params.subscribe((params) => {
      //Solicitar info de transporte flete y guardar los paquetes de la respuesta en paquetes
      this.transporteFleteService
        .getTransportesFlete(params.id)
        .subscribe((transporteFlete) => {
          this.transporteFlete = transporteFlete;
          console.log(transporteFlete);
        });
    });
  }

  async altaPaquete() {
    const id = uuidv4();
    if (this.transporteFlete.paquete) {
      console.log('muchos paquetes');
      this.transporteFlete.paquete.push(id);
    } else {
      console.log('un paquete');
      this.transporteFlete.paquete = [id];
    }
    this.transporteFleteService
      .postTransportesFlete(this.transporteFlete)
      .subscribe((res) => {
        if (!res.results) {
          this.mostrarAlerta(
            'Error',
            'Error',
            'No se ha podido agregar un nuevo paquete'
          );
          this.transporteFlete.paquete.pop();
        }
      });
  }

  async verInformacion() {
    const modal = await this.modalController.create({
      component: InfoPaquetesComponent,
      componentProps: { flete: this.transporteFlete.flete },
      cssClass: 'modalGeneral',
    });
    return await modal.present();
  }
  eliminar(paquete: string) {
    this.paquetesService.deletePaquete(paquete).subscribe((va) => {
      if (va.results) {
        this.transporteFleteService
          .postTransportesFlete(this.transporteFlete)
          .subscribe((val) => {
            if (val.results) {
              this.transporteFlete.paquete =
                this.transporteFlete.paquete.filter((item) => item !== paquete);
            } else {
              this.mostrarAlerta(
                'Error',
                'Error',
                'No se ha podido eliminar el paquete'
              );
            }
          });
      } else {
        this.mostrarAlerta(
          'Error',
          'Error',
          'No se ha podido eliminar el paquete'
        );
      }
    });
  }
  navegar(paquete: string) {
    this.router.navigate(['./', paquete, 'items'], {
      relativeTo: this.activedRoute,
    });
  }

  async mostrarAlerta(titulo: string, subtitulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      subHeader: subtitulo,
      message: mensaje,
      buttons: ['OK'],
    });
    return alert.present();
  }
}
