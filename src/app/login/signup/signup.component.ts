import { AlertController, ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

import { Empresa } from 'src/app/fletes/interfaces/empresa';
import { EmpresaService } from 'src/app/fletes/services/empresa.service';
import { EstadosService } from 'src/app/services/estados.service';
import { LoginService } from 'src/app/fletes/services/login.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  empresa: Empresa = {
    nombre: '',
    correo: '',
    password: '',
    telefono: '',
    estados: [],
  };
  confirmPassword = '';
  estados = this.estadosService.getEstados();

  constructor(
    private estadosService: EstadosService,
    private empresaService: EmpresaService,
    private modalController: ModalController,
    private alertCtrl: AlertController,
    private loginService: LoginService
  ) {}

  async mostrarAlerta(titulo: string, subtitulo: string, mensaje: string) {
    const alert = await this.alertCtrl.create({
      header: titulo,
      subHeader: subtitulo,
      message: mensaje,
      buttons: ['OK'],
    });
    return alert.present();
  }

  ngOnInit() {
    console.log(this.estados);
  }

  onSubmit() {
    if (this.validaciones()) {
      this.loginService
        .solicitarRegistro(this.empresa.correo)
        .subscribe((solicitud) => {
          if (solicitud.permiso) {
            this.empresaService.postEmpresa(this.empresa).subscribe((res) => {
              if (res.results) {
                this.mostrarAlerta(
                  'Completado',
                  'Creación',
                  'Empresa creada exitosamente.'
                );
                this.cerrar();
              } else {
                this.mostrarAlerta(
                  'Error',
                  'Creación',
                  'Error al crear la empresa.'
                );
              }
            });
          } else {
            this.mostrarAlerta(
              'Error:',
              'Correo ya registrado',
              'Favor de introducir otro correo.'
            );
          }
        });
    }
  }

  validaciones(): boolean {
    if (
      this.empresa.nombre.trim().length <= 0 ||
      this.empresa.telefono.trim().length <= 0 ||
      this.empresa.correo.trim().length <= 0 ||
      this.empresa.password.trim().length <= 0 ||
      this.empresa.estados.length <= 0
    ) {
      this.mostrarAlerta(
        'Error',
        'Campos vacios',
        'No deje espacios en blanco.'
      );
      return false;
    }

    if (!this.empresa.correo.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      this.mostrarAlerta('Error:', 'Revise el formato del correo', 'por favor');
      return false;
    }

    if (!this.empresa.nombre.match(/^[_a-zA-Z ]+$/)) {
      this.mostrarAlerta('Error:', 'Revise del campo nombre', 'por favor');
      return false;
    }
    if (this.confirmPassword !== this.empresa.password) {
      this.mostrarAlerta(
        'Error:',
        'Confirmación de clave incorrecta',
        '¿Es correcta o esta vacia?'
      );
      return false;
    }
    console.log('TODO OK EN VALIDACIONES');
    return true;
  }

  cerrar() {
    this.modalController.dismiss();
  }
}
