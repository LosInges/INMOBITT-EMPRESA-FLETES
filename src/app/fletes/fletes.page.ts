import { ModalController } from '@ionic/angular';
import { AltaComponent } from './alta/alta.component';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../services/session.service';
import { Flete } from './interfaces/flete';
import { FletesService } from './services/fletes.service';
import { NavigationEnd} from '@angular/router';
//[routerLink]="['/', 'fletes', flete.id, 'paquetes']"

@Component({
  selector: 'app-fletes',
  templateUrl: './fletes.page.html',
  styleUrls: ['./fletes.page.scss'],
})
export class FletesPage implements OnInit {
  eventosRouter: any;
  fletes: Flete[] = [];
  constructor(
    private router: Router,
    private sessionService: SessionService,
    private fletesService: FletesService,
    private modalController: ModalController
  ) {
    router.events.subscribe(e=>{
      if(e instanceof NavigationEnd){
        this.sessionService.keys().then(k=>{
          if(k.length <= 0){
            this.router.navigate([''])
          }
        })
      }
    })
  }

  ngOnInit() {
    this.sessionService.get('empresa')?.then((empresa) => {
      this.fletesService.getFletesE(empresa).subscribe((fletes) => {
          this.fletes = fletes;
      });
    });
  }

  async abrirRegistro() {
    const modal = await this.modalController.create({
      component: AltaComponent,
      cssClass: 'modalGeneral'
    });
    return await modal.present();
  }

  eliminar(flete: Flete) {
    this.fletesService.deleteFlete(flete).subscribe((val) => {
      this.fletes = val.results
        ? this.fletes.filter((f) => f != flete)
        : this.fletes;
    });
  }

  navegar(flete: Flete) {
    this.router.navigate(['/', 'fletes', flete.id, 'paquetes']);
  }
}
