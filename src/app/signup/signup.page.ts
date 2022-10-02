import { Component, OnInit } from '@angular/core';
import { Empresa } from '../fletes/interfaces/empresa';
import { EstadosService } from '../services/estados.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  empresa: Empresa = {
    nombre: '',
    correo: '',
    password: '',
    telefono: '',
    estados: [],
  };
  confirmPassword = '';
  estados = this.estadosService.getEstados();

  constructor(private estadosService: EstadosService, public formBuilder: FormBuilder) {}

  ngOnInit() {}

  onSubmit() {
    console.log(this.empresa);
  }

  registrarEmpresa(){}
}
