import { Component, Input, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Cargador } from 'src/app/fletes/interfaces/cargador';
import { CargadoresService } from 'src/app/fletes/services/cargadores.service';
import { FotoService } from 'src/app/services/foto.service';
import { ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { LoginService } from 'src/app/fletes/services/login.service';

@Component({
  selector: 'app-alta',
  templateUrl: './alta.component.html',
  styleUrls: ['./alta.component.scss'],
})
export class AltaComponent implements OnInit {
  @Input() empresa: string;
  api = environment.api;
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
    private alertCtrl: AlertController,
    private fotoService: FotoService,
    private loginService: LoginService
  ) {}

  async mostrarAlerta(titulo: string, subtitulo: string, mensaje: string) {
    const alert = await this.alertCtrl.create({
      header: titulo,
      subHeader: subtitulo,
      message: mensaje,
      buttons: ['OK'],
    });
    await alert.present();
    const result = await alert.onDidDismiss();
    console.log(result);
  }

  ngOnInit() {
    this.cargador.empresa = this.empresa;
  }

  cerrar() {
    return this.modalController.dismiss();
  }

  registrarCargador() {
    if (
      this.cargador.nombre.trim().length <= 0 ||
      this.apellido1.length <= 0 ||
      this.apellido2.length <= 0 ||
      this.cargador.password.trim().length <= 0 ||
      this.cargador.rfc.trim().length <= 0 ||
      this.cargador.telefono.trim().length <= 0 ||
      this.cargador.foto.length <= 0
    ) {
      this.mostrarAlerta(
        'Error',
        'Campos vacios',
        'No deje espacios en blanco.'
      );
    } else {
      this.cargador.apellido = this.apellido1 + ' ' + this.apellido2;
      this.loginService
        .solicitarRegistro(this.cargador.rfc)
        .subscribe((solicitud) => {
          if (solicitud.permiso) {
            this.cargadoresService
              .postCargador(this.cargador)
              .subscribe((res) => {
                if (res.results) {
                  this.modalController.dismiss();
                  this.mostrarAlerta(
                    'Completado',
                    'Creación',
                    'Cargador registrado exitosamente.'
                  );
                } else {
                  this.modalController.dismiss(this.cargador);
                }
              });
          } else {
            this.mostrarAlerta(
              'Error:',
              'RFC ya registrado',
              'Favor de introducir otro correo.'
            );
          }
        });
    }
  }

  tomarFotografia() {
    this.fotoService.tomarFoto().then((photo) => {
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
      fetch(photo.webPath).then((v) =>
        v.blob().then((imagen) => reader.readAsArrayBuffer(imagen))
      );
    });
  }
}
