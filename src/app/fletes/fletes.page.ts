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
    this.sessionService.keys().then((data) => {
      console.log(data);
    });
  }
}
