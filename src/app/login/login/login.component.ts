import { Component, OnInit } from '@angular/core';
import { EmpresaService } from 'src/app/fletes/services/empresa.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';

  constructor(private empresaService: EmpresaService) {}

  ngOnInit() {}

  onSubmit() {
    alert(this.email + ', ' + this.password);
  }

  loginEmpresa(){
   this.empresaService.login(this.email,this.password).subscribe();
  }
  
}
