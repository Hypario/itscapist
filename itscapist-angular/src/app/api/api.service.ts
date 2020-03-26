import {Injectable} from '@angular/core';

export interface JWT {
  token: string;
  token_type: string;
  connected: boolean;
}

const domain = 'http://localhost:8000/api';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() {
  }

  jwt: JWT = {token: '', token_type: '', connected: false};

  send(method: string, url: string, body = null, headers = {}) {
    return fetch(domain + url, {
      method,
      headers,
      body
    });
  }

  sendWithToken(method: string, url: string, body = null) {
    return this.send(method, url, body, {Authorization: this.jwt.token_type + ' ' + this.jwt.token});
  }

  setToken(token: string, type: string) {
    this.jwt.token = token;
    this.jwt.token_type = type;
    this.jwt.connected = this.jwt.token !== '' && this.jwt.token_type !== '';
  }

}
