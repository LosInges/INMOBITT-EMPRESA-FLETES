
import { ModalController } from '@ionic/angular';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Empresa } from '../../interfaces/empresa';
import { Flete } from '../../interfaces/flete';
import { Precarga } from '../../interfaces/precarga';
import { EmpresaService } from '../../services/empresa.service';
import { FletesService } from '../../services/fletes.service';
import { PrecargaService } from '../../services/precarga.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-precarga',
  templateUrl: './precarga.component.html',
  styleUrls: ['./precarga.component.scss'],
})
export class PrecargaComponent implements OnInit {
  eventosRouter: any;
  fecha: string = new Date().toISOString();
  consulta = false;
  id: string;

  precarga: Precarga = {
    id: '',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    cajas_chicas: 0,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    cajas_grandes: 0,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    cajas_medianas: 0,
    muebles: 0,
    empresa: '',
    cliente: '',
    destino: {
      calle: 'Lago Ontario',
      codigopostal: '63173',
      colonia: 'Lagos del Country',
      numeroexterior: '10',
      numerointerior: '',
      estado: 'Nayarit',
    },
    fecha: '',
    hora: '',
    origen: {
      calle: 'Av. Tecnologico',
      codigopostal: '63175',
      colonia: 'Lagos del Country',
      numeroexterior: '2595',
      numerointerior: '',
      estado: 'Nayarit',
    },
    telefono: '',
  };

  empresas: Empresa[] = [];

  constructor(
    private empresaService: EmpresaService,
    private precargaService: PrecargaService,
    private activatedRoute: ActivatedRoute,
    private fletesService: FletesService,
    private router: Router
  ){
  }

  ngOnInit() {
    if (this.activatedRoute.snapshot.paramMap.get('id')) {
      this.id = this.activatedRoute.snapshot.paramMap.get('id');
      this.precargaService.getPrecarga('empresa@mail.com', this.id).subscribe(
        (precarga) => {
          this.consulta = true;
          this.precarga = precarga;
          let hr = Number(this.precarga.hora.split(':')[0]);
          hr = hr >= 6 ? hr - 6 : hr + 18;
          const fecha = new Date(
            Number(this.precarga.fecha.split('-')[0]), //AÑO
            Number(this.precarga.fecha.split('-')[1]) - 1, //MES (INDICE)
            Number(this.precarga.fecha.split('-')[2]), //DÍA
            hr, //HORA
            Number(this.precarga.hora.split(':')[1]) //MINUTOS
            );
          this.fecha = fecha.toISOString();
          console.log(fecha.toISOString(), this.precarga.hora);
          console.log(this.precarga);

        },
        (err) => {
          console.log(err);
          this.consulta = false;
        }
      );
    }
    this.empresaService.getEmpresas().subscribe((empresas) => {
      this.empresas = empresas;
    });
  }

  registrarPrecarga() {
   this.precarga.fecha = this.fecha.split('T')[0];
    this.precarga.hora = this.fecha.split('T')[1].split('.')[0].substring(0, 5);
     this.precargaService.postPrecarga(this.precarga).subscribe((res) => {
      console.log(res);
    });
    console.log(this.precarga); 
    this.router.navigate(['/fletes/precargas']);
  }

}
