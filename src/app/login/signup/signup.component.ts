
import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController} from '@ionic/angular';
import { Empresa } from 'src/app/fletes/interfaces/empresa';
import { EmpresaService } from 'src/app/fletes/services/empresa.service';
import { EstadosService } from 'src/app/services/estados.service';
import { Router } from '@angular/router';

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
    private router: Router,
  ) { }

  async mostrarAlerta(titulo:string, subtitulo:string, mensaje:string) {  
    const alert = await this.alertCtrl.create({  
      header: titulo,  
      subHeader: subtitulo,  
      message: mensaje,  
      buttons: ['OK']  
    });  
    await alert.present();  
    const result = await alert.onDidDismiss();  
    console.log(result);  
    this.router.navigate(['/', 'login'])
  } 

  ngOnInit() {
    console.log(this.estados);
  }

  onSubmit() {
    if (
      this.empresa.nombre.trim().length <= 0 ||
      this.empresa.correo.trim().length <= 0 ||
      this.empresa.password.trim().length <= 0 ||
      this.empresa.telefono.trim().length <= 0 ||
      this.empresa.estados.length <= 0
    ) {
      if (this.confirmPassword === this.empresa.password) {
        this.empresaService.postEmpresa(this.empresa).subscribe((res) => {
          console.log(res);
          this.mostrarAlerta("Completado", "Creación", "Cliente creado exitosamente.")
          this.cerrar()
        });
      }else{
        this.mostrarAlerta("Error:", "Confirmación de clave incorrecta", "¿es correcta o esta vacia?")
      }
    } 
  }
  cerrar() {
    this.modalController.dismiss()
  }
}
