import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-fletes',
  templateUrl: './fletes.page.html',
  styleUrls: ['./fletes.page.scss'],
})
export class FletesPage implements OnInit {
  constructor(private sessionService: SessionService) {}

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
  }
}
