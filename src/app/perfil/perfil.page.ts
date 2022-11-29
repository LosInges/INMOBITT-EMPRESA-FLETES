import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { Empresa } from '../fletes/interfaces/empresa';
import { CargadoresService } from '../fletes/services/cargadores.service';
import { EmpresaService } from '../fletes/services/empresa.service';
import { FletesService } from '../fletes/services/fletes.service';
import { TransportesService } from '../fletes/services/transportes.service';
import { EstadosService } from '../services/estados.service';
import { FotoService } from '../services/foto.service';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  estados = this.estadosService.getEstados();
  api = environment.api;
  confirmPassword = '';
  empresa: Empresa = {
    nombre: '',
    correo: '',
    estados: [],
    password: '',
    telefono: '',
    logo: '',
  };

  constructor(
    private sessionService: SessionService,
    private empresaService: EmpresaService,
    private estadosService: EstadosService,
    private fotoService: FotoService,
    private cargadoresService: CargadoresService,
    private transportesService: TransportesService,
    private fletesService: FletesService,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.sessionService.get('empresa').then((correo) => {
      this.empresaService.getEmpresa(correo).subscribe((empresa) => {
        this.empresa = empresa;
      });
    });
  }

  tomarFotografia() {
    this.fotoService.tomarFoto().then((photo) => {
      const reader = new FileReader();
      const datos = new FormData();
      reader.onload = () => {
        const imgBlob = new Blob([reader.result], {
          type: `image/${photo.format}`,
        });
        datos.append('img', imgBlob, `imagen.${photo.format}`);
        this.fotoService
          .subirImgMiniatura(datos)
          .subscribe((res) => (this.empresa.logo = res.miniatura));
      };
      fetch(photo.webPath).then((v) =>
        v.blob().then((imagen) => reader.readAsArrayBuffer(imagen))
      );
    });
  }

  actualizarPerfil() {
    if (this.empresa.password !== this.confirmPassword) {
      this.alertCtrl
        .create({
          header: 'Error',
          message: 'Las contraseñas no coinciden',
          buttons: ['OK'],
        })
        .then((alert) => alert.present());
      return;
    }
    this.empresaService.postEmpresa(this.empresa).subscribe((res) => {
      if (res.results) {
        this.alertCtrl
          .create({
            header: 'Actualización exitosa',
            message: 'Los datos de tu perfil se han actualizado correctamente',
            buttons: ['OK'],
          })
          .then((alert) => {
            alert.present();
          });
      } else {
        this.alertCtrl
          .create({
            header: 'Error',
            message: 'No se pudo actualizar tu perfil',
            buttons: ['OK'],
          })
          .then((alert) => {
            alert.present();
          });
      }
    });
  }

  eliminarPerfil() {
    this.cargadoresService
      .getCargadores(this.empresa.correo)
      .subscribe((cargadores) => {
        cargadores.forEach((cargador) => {
          this.cargadoresService
            .deleteCargador(cargador)
            .subscribe((res) => {});
        });
      });
    this.transportesService
      .getTransportes(this.empresa.correo)
      .subscribe((transportes) => {
        transportes.forEach((transporte) => {
          this.transportesService
            .deleteTransporte(transporte)
            .subscribe((res) => {});
        });
      });

    this.fletesService.getFletesE(this.empresa.correo).subscribe((fletes) => {
      fletes.forEach((flete) => {
        this.fletesService.deleteFlete(flete).subscribe((res) => {});
      });
    });

    this.empresaService
      .deleteEmpresa(this.empresa.correo)
      .subscribe((res) => {});
  }
}
