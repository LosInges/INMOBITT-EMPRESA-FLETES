import { Component, OnInit } from '@angular/core';
import { CargadoresService } from 'src/app/fletes/services/cargadores.service';
import { EmpresaService } from 'src/app/fletes/services/empresa.service';
import { LoginService } from 'src/app/fletes/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';

  constructor(private loginService: LoginService) {}

  ngOnInit() {}

  onSubmit() {
    alert(this.email + ', ' + this.password);
  }

  login() {
    this.loginService.login(this.email, this.password).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => console.log(err)
    );
  }
}
