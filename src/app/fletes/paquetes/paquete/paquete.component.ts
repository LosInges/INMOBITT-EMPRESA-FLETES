import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NavigationEnd, Router } from '@angular/router';
import { Item } from '../../interfaces/item';
import { PaquetesService } from '../../services/paquetes.service';
import { ItemsService } from '../../services/items.service';
import { v4 as uuidv4 } from 'uuid';

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
  constructor(
    private modalController: ModalController,
    private itemService: ItemsService
  ) { }

  ngOnInit() {
    this.item.id = this.id;
    this.item.idItem = uuidv4();
  }

  cerrar() { this.modalController.dismiss() }

  agregarItem() {
    this.itemService.postItem(this.item).subscribe((res) => {
      if (res.results) this.modalController.dismiss(this.item)
    });
  }
}