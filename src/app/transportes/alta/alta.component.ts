import { ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';
import { Transporte } from 'src/app/fletes/interfaces/transporte';
import { TransportesService } from 'src/app/fletes/services/transportes.service';
import { AlertController} from '@ionic/angular';

@Component({
  selector: 'app-alta',
  templateUrl: './alta.component.html',
  styleUrls: ['./alta.component.scss'],
})
export class AltaComponent implements OnInit {
  @Input() empresa: string;

  transporte: Transporte = {
    matricula: '',
    capacidad: 0,
    empresa: '',
    activo: true,
  };

  constructor(
    private transportesService: TransportesService,
    private modalController: ModalController,
    private alertController: AlertController
  ) {}

  async mostrarAlerta(titulo:string, subtitulo:string, mensaje:string) {  
    const alert = await this.alertController.create({  
      header: titulo,  
      subHeader: subtitulo,  
      message: mensaje,  
      buttons: ['OK']  
    });  
    await alert.present();  
    const result = await alert.onDidDismiss();  
    console.log(result);  
  } 

  ngOnInit() {
    this.transporte.empresa = this.empresa;
  }

  cerrar() {
    return this.modalController.dismiss();
  }

  registrarTransporte() {
    if(this.transporte.matricula.trim().length <= 0 ){
      this.mostrarAlerta("Error:", "Campo vacio", "Recuerde llenar los campos necesarios.")
      return;
    }

    this.transportesService
      .postTransporte(this.transporte)
      .subscribe((transporte) => this.modalController.dismiss(this.transporte));
  }
}
