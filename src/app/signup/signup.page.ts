import { Component, OnInit } from '@angular/core';
import { Empresa } from '../fletes/interfaces/empresa';
import { EstadosService } from '../services/estados.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmpresaService } from '../fletes/services/empresa.service';

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

  constructor(
    private estadosService: EstadosService,
    private empresaService: EmpresaService,
    public formBuilder: FormBuilder
  ) {}

  ngOnInit() {}

  onSubmit() {
    if (this.confirmPassword === this.empresa.password) {
      this.empresaService.postEmpresa(this.empresa).subscribe((res) => {
        console.log(res);
      });
    }
  }
}
