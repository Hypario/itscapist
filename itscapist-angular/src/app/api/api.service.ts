import {Injectable} from '@angular/core';

interface JWT {
  token: string;
  token_type: string;
}

const domain = 'http://localhost:8000/api';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() {
  }

  jwt: JWT = {token: '', token_type: ''};

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

  /**
   * Returns a Promise which awaits for a response, then parsed in json
   */
  getUser() {
    return this.sendWithToken('GET', '/me').then((response) => {
      return response.json();
    });
  }

  logout() {
    return this.sendWithToken('POST', '/logout', {token: this.jwt.token}).then((response) => {
      return response.json();
    });
  }

  isConnected() {
    return this.jwt.token !== '' && this.jwt.token_type !== '';
  }

  setToken(token: string, type: string) {
    this.jwt.token = token;
    this.jwt.token_type = type;
  }

}
