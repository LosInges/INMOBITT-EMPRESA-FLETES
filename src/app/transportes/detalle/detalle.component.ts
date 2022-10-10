import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { merge } from 'rxjs';
import { Transporte } from 'src/app/fletes/interfaces/transporte';
import { TransportesService } from 'src/app/fletes/services/transportes.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {
  transporte: Transporte = {
    matricula: '',
    capacidad: 0,
    empresa: 'empresa@mail.com',
    activo: true,
  };

  constructor(
    private transportesService: TransportesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.transportesService
      .getTransporte(
        'empresa@mail.com',
        this.activatedRoute.snapshot.paramMap.get('matricula')
      )
      .subscribe((transporte) => (this.transporte = transporte));
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
