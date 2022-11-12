import { Component, Input, OnInit } from '@angular/core';

import { Cargador } from 'src/app/fletes/interfaces/cargador';
import { CargadoresService } from 'src/app/fletes/services/cargadores.service';
import { FotoService } from 'src/app/services/foto.service';
import { ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-alta',
  templateUrl: './alta.component.html',
  styleUrls: ['./alta.component.scss'],
})
export class AltaComponent implements OnInit {
  api = environment.api;
  @Input() empresa: string;
  apellido1 = '';
  apellido2 = '';
  cargador: Cargador = {
    rfc: '',
    nombre: '',
    apellido: '',
    password: '',
    telefono: '',
    foto: '',
    empresa: '',
  };

  constructor(
    private cargadoresService: CargadoresService,
    private modalController: ModalController,
    private fotoService: FotoService
  ) {}

  ngOnInit() {
    this.cargador.empresa = this.empresa;
  }

  cerrar() {
    return this.modalController.dismiss();
  }

  registrarCargador() {
    this.cargador.apellido = this.apellido1 + ' ' + this.apellido2;
    this.cargadoresService.postCargador(this.cargador).subscribe((res) => {
      this.modalController.dismiss(this.cargador);
    });
  }

  tomarFotografia(){
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
