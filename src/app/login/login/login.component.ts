import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { LoginService } from 'src/app/fletes/services/login.service';
import { SessionService } from 'src/app/services/session.service';

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
    private modalController: ModalController
  ) {}

  ngOnInit() {}

  onSubmit() {
    alert(this.email + ', ' + this.password);
  }

  login() {
    this.loginService.login(this.email, this.password).subscribe(
      (res) => {
        console.log(res)

        const promesas: Promise<any>[] = [
          this.sessionService.set('email', res.session.email),
          this.sessionService.set('tipo', res.session.tipo),
        ];
        if (res.session.tipo === 'cargador' ) {
          promesas.push(this.sessionService.set('empresa', res.session.empresa));
          console.log('ENTRÓ')
        }
        Promise.all(promesas).then((val) => {
          console.log(val)
        });
      },
      (err) => console.log(err)
    );
  }
  cerrar(){
    this.modalController.dismiss();
  }
}
