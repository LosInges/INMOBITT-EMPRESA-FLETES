
import { ModalController } from '@ionic/angular';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router,NavigationEnd} from '@angular/router';
import { Estado } from 'src/app/interfaces/estado';
import { EstadosService } from 'src/app/services/estados.service';
import { Precarga } from '../interfaces/precarga';
import { PrecargaService } from '../services/precarga.service';
import { DetalleComponent } from './detalle/detalle.component';
import { EmpresaService } from '../services/empresa.service';
import { Empresa } from '../interfaces/empresa';

@Component({
  selector: 'app-precargas',
  templateUrl: './precargas.component.html',
  styleUrls: ['./precargas.component.scss'],
})
export class PrecargasComponent implements OnInit, OnDestroy {
  estados: Estado[] = this.estadosService.getEstados();
  precargas?: Precarga[];
  eventosRouter: any;
  @Input() precarga: Precarga
  empresas: Empresa[]

  constructor(
    private empresaService: EmpresaService,
    private estadosService: EstadosService,
    private precargaService: PrecargaService,
    private modalController: ModalController,
    private router: Router
  )  {
    this.eventosRouter = this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.ngOnInit();
      }
    });
  }

  ngOnInit() {
    this.empresaService
    .getEmpresas().subscribe((empresas)=> this.empresas=empresas)
    this.precargaService
      .getPrecargas('empresa@mail.com')
      .subscribe((precargas) => {
        this.precargas = precargas;
      });
  }


  ngOnDestroy(): void {
    if (this.eventosRouter) {
      this.eventosRouter.unsubscribe();
    }
  }
  async abrirDetalle(precarga:Precarga){
    console.log(precarga)
    const modal = await this.modalController.create({
      component: DetalleComponent,
     componentProps: {precarga, empresas: this.empresas}
    });
    return await modal.present();
  }

}
