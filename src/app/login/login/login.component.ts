import { Component, OnInit } from '@angular/core';
import { CargadoresService } from 'src/app/fletes/services/cargadores.service';
import { EmpresaService } from 'src/app/fletes/services/empresa.service';
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
    private sessionService: SessionService
  ) {}

  ngOnInit() {}

  onSubmit() {
    alert(this.email + ', ' + this.password);
  }

  login() {
    this.loginService.login(this.email, this.password).subscribe(
      (res) => {
        this.sessionService.set('email', res.session.email);
        this.sessionService.set('tipo', res.session.tipo);
        if (res.tipo === 'cargador') {
          this.sessionService.set('empresa', res.empresa);
        }
        this.sessionService
          .keys()
          .then((data) => {
            console.log(data, res);
          })
          .catch((err) => {
            console.log(err);
          });
      },
      (err) => console.log(err)
    );
  }
}
