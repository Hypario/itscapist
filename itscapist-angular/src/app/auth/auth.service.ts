import {Injectable} from '@angular/core';

export interface JWT {
  token: string;
  token_type: string;
  connected: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwt: JWT = {token: '', token_type: '', connected: false};

  constructor() {
  }

  setToken(token: string, type: string) {
    this.jwt.token = token;
    this.jwt.token_type = type;
    this.jwt.connected = this.jwt.token !== '' && this.jwt.token_type !== '';
  }

}
