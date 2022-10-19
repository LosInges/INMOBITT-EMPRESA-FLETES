import { ModalController } from '@ionic/angular';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router,NavigationEnd} from '@angular/router';
import { merge } from 'rxjs';
import { Transporte } from 'src/app/fletes/interfaces/transporte';
import { TransportesService } from 'src/app/fletes/services/transportes.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit, OnDestroy {
  eventosRouter: any;
  @Input() transporte: Transporte

  constructor(
    private transportesService: TransportesService,
    private activatedRoute: ActivatedRoute,
    private modalController: ModalController,
    private router: Router
  ) {
    this.eventosRouter = this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.ngOnInit();
      }
    });
  }

  ngOnInit() {
    this.transportesService
      .getTransporte(
        'empresa@mail.com',
        this.activatedRoute.snapshot.paramMap.get('matricula')
      )
      .subscribe((transporte) => (this.transporte = transporte));
  }

  cerrar() {
    return this.modalController.dismiss();
  }
  ngOnDestroy(): void {
    if (this.eventosRouter) {
      this.eventosRouter.unsubscribe();
    }
  }


  actualizarTransporte() {
    if (
      this.activatedRoute.snapshot.paramMap.get('matricula') !==
      this.transporte.matricula
    ) {
      const transporte = { ...this.transporte };
      transporte.matricula =
        this.activatedRoute.snapshot.paramMap.get('matricula');
      merge(
        this.transportesService.deleteTransporte(transporte),
        this.transportesService.postTransporte(this.transporte)
      ).subscribe((data) => {
        console.log(data);
        this.router
          .navigate(['/transportes']);
      });
      return;
    }
    this.transportesService
      .postTransporte(this.transporte)
      .subscribe((transporte) => console.log(transporte));
  }

  bajaTransporte() {
    this.transportesService
      .deleteTransporte(this.transporte)
      .subscribe((data) => {
        console.log(data);
      });
  }
}
