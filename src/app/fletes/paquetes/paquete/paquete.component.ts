/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Item } from '../../interfaces/item';
import { ItemsService } from '../../services/items.service';
import { v4 as uuidv4 } from 'uuid';
import { FotoService } from 'src/app/services/foto.service';

@Component({
  selector: 'app-paquete',
  templateUrl: './paquete.component.html',
  styleUrls: ['./paquete.component.scss'],
})
export class PaqueteComponent implements OnInit {
  @Input() id: string;
  @Input() total: number;
  item: Item = {
    id: '',
    id_item: '',
    foto: '',
    item: '',
    total: 0,
    alto_item: 0,
    ancho_item: 0,
  };
  constructor(
    private modalController: ModalController,
    private itemService: ItemsService,
    private fotoService: FotoService
  ) {}

  ngOnInit() {
    this.item.id = this.id;
    this.item.id_item = uuidv4();
    this.item.total = this.total;
  }

  cerrar() {
    this.modalController.dismiss();
  }

  agregarItem() {
    this.itemService.postItem(this.item).subscribe((res) => {
      if (res.results) {
        this.modalController.dismiss(this.item);
      }
    });
  }

  tomarFotografia() {
    this.fotoService.tomarFoto().then((photo) => {
      // this.fotoService.subirMiniatura(photo.webPath).subscribe((data) => {
      //   console.log(data);
      // });
      console.log(photo);
      const reader = new FileReader();
      const datos = new FormData();
      reader.onload = () => {
        const imgBlob = new Blob([reader.result], {
          type: `image/${photo.format}`,
        });
        datos.append('img', imgBlob, `imagen.${photo.format}`);
        this.fotoService
          .subirMiniatura(datos)
          .subscribe((res) => console.log(res));
      };
      const consulta = fetch(photo.webPath).then((v) =>
        v.blob().then((imagen) => reader.readAsArrayBuffer(imagen))
      );
    });
  }
}
