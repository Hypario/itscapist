import { Component } from '@angular/core';
import {AuthService, JWT} from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'itscapist';

  jwt: JWT = this.auth.jwt;

  constructor(private auth: AuthService) {
  }

}
