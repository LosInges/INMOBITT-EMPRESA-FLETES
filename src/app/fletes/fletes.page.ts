import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { Flete } from './interfaces/flete';
import { FletesService } from './services/fletes.service';

@Component({
  selector: 'app-fletes',
  templateUrl: './fletes.page.html',
  styleUrls: ['./fletes.page.scss'],
})
export class FletesPage implements OnInit {
  fletes: Flete[] = [];
  constructor(
    private sessionService: SessionService,
    private fletesService: FletesService
  ) {}

  ngOnInit() {
    this.sessionService.keys()?.then((data) => {
      if (data) {
        data.forEach((key) => {
          this.sessionService.get(key).then((value) => {
            console.log(key + ': ' + value);
          });
        });
      }
    });
    this.fletesService.getFletesE('empresa@mail.com').subscribe((fletes) => {
      this.fletes = fletes;
    });
  }
}
