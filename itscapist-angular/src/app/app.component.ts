import { Component } from '@angular/core';
import {ApiService, JWT} from './api/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'itscapist';

  jwt: JWT = this.auth.jwt;

  constructor(private auth: ApiService) {
  }

}
