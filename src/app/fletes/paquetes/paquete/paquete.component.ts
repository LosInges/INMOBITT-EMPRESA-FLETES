import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {NavigationEnd, Router} from '@angular/router';
import { Item } from '../../interfaces/item';
import { PaquetesService } from '../../services/paquetes.service';

@Component({
  selector: 'app-paquete',
  templateUrl: './paquete.component.html',
  styleUrls: ['./paquete.component.scss'],
})
export class PaqueteComponent implements OnInit {
  @Input() id: string;

  item: Item = {
    id: "",
    idItem: "",
    foto: "Holi",
    item: "",
    total: 0,
    altoItem: 0,
    anchoItem: 0,
  }
  constructor(private modalController: ModalController,
    private paqueteService: PaquetesService,
    private router: Router,) { }

  ngOnInit() {
    this.item.id = this.id;
  }

  cerrar() { this.modalController.dismiss() }
  
  agregarItem(){
    this.paqueteService.getPaquetes(this.id).subscribe((res) =>{
      this.item = {
        id: "",
        idItem: "",
        foto: "Holi",
        item: "",
        total: 0,
        altoItem: 0,
        anchoItem: 0,
      };
      this.router.navigate(['/paquete']);
  });
 }
}