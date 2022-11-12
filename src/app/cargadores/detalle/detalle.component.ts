import { Component, Input, OnInit } from '@angular/core';

import { Cargador } from 'src/app/fletes/interfaces/cargador';
import { CargadoresService } from 'src/app/fletes/services/cargadores.service';
import { FotoService } from './../../services/foto.service';
import { ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {
  api = environment.api;
  @Input() cargador: Cargador
  apellido1: string;
  apellido2: string;
  constructor(private modalController: ModalController,
    private cargadoresService: CargadoresService,
    private fotoService: FotoService
    ) { }

  ngOnInit() {
    this.apellido1 = this.cargador.apellido.split(" ")[0];
    this.apellido2 = this.cargador.apellido.split(" ").length > 1 ? this.cargador.apellido.split(" ")[1] : "";
  }

  cerrar() {
    this.modalController.dismiss({ cargador: this.cargador, actualizado: false })
  }

  actualizarCargador() {
    this.cargador.apellido = this.apellido1 + ' ' + this.apellido2;
    this.cargadoresService.postCargador(this.cargador).subscribe(val => {
      if (val.results) this.modalController.dismiss({ cargador: this.cargador, actualizado: true })
      else console.log(val)
    })
  }

  tomarFotografia() {
    this.fotoService.tomarFoto().then((photo) => {
      // this.fotoService.subirMiniatura(photo.webPath).subscribe((data) => {
      //   console.log(data);
      // });
      console.log(photo);
      const reader = new FileReader();
      const datos = new FormData();
      reader.onload = () => {
        const imgBlob = new Blob([reader.result], {
          type: `image/${photo.format}`,
        });
        datos.append('img', imgBlob, `imagen.${photo.format}`);
        this.fotoService
          .subirMiniatura(datos)
          .subscribe((res) => (this.cargador.foto = res.path));
      };
      const consulta = fetch(photo.webPath).then((v) =>
        v.blob().then((imagen) => reader.readAsArrayBuffer(imagen))
      );
    });
  }
}
