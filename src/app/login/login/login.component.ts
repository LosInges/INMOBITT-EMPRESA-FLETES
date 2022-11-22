import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { LoginService } from 'src/app/fletes/services/login.service';
import { SessionService } from 'src/app/services/session.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';

  constructor(
    private loginService: LoginService,
    private sessionService: SessionService,
    private router: Router,
    private alertCtrl: AlertController,
    private modalController: ModalController
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

  ngOnInit() {}

  onSubmit() {
    alert(this.email + ', ' + this.password);
  }

  login() {
    if (this.email.trim().length <= 0 || this.password.trim().length <= 0) {
      this.mostrarAlerta(
        'Error',
        'Campos vacios',
        'No deje espacios en blanco.'
      );
    } else {
      this.loginService.login(this.email, this.password).subscribe(
        (res) => {
          if (res.session.tipo !== 'empresa') {
            console.log('NO es empresa');
            this.mostrarAlerta(
              'Error:',
              'Correo inválido',
              'Recuerde bien su correo y contraseña'
            );
            return;
          }

          const promesas: Promise<any>[] = [
            this.sessionService.set('tipo', res.session.tipo),
          ];
          if (res.session.tipo === 'cargador') {
            promesas.push(
              this.sessionService.set('empresa', res.session.empresa)
            );
            promesas.push(this.sessionService.set('rfc', res.session.email));
          } else {
            promesas.push(
              this.sessionService.set('empresa', res.session.email)
            );
          }

          Promise.all(promesas).then(() => {
            this.cerrar();
            this.router.navigate(['/', 'fletes']);
          });
        },
        (err) => console.log(err)
      );
    }
  }

  onKeydown(event: Event) {
    console.log(event);

    this.login();
    this.cerrar();
  }
  cerrar() {
    this.modalController.dismiss();
  }
}
