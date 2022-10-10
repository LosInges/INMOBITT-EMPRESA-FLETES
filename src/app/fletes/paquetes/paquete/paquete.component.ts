import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-paquete',
  templateUrl: './paquete.component.html',
  styleUrls: ['./paquete.component.scss'],
})
export class PaqueteComponent implements OnInit {
  id = this.activatedRoute.snapshot.paramMap.get('id');
  flete = this.activatedRoute.snapshot.paramMap.get('flete');

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    console.log(this.id, this.flete);
  }
}
