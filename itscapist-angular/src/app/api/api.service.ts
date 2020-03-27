import {Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

interface JWT {
  token: string;
  token_type: string;
}

const domain = 'http://localhost:8000/api';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private snackBar: MatSnackBar) {
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
    return this.send(method, url, body, {
      Accept: 'application/json',
      Authorization: this.jwt.token_type + ' ' + this.jwt.token
    });
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
    const data = new FormData();
    data.append('token', this.jwt.token);
    this.sendWithToken('POST', '/logout', data).then((response) => {
      return response.json();
    }).then((json) => {
      if (json.success) {
        this.jwt = {token: '', token_type: ''};
        this.snackBar.open('Vous êtes maintenant déconnecté.', null, {
          duration: 5 * 1000
        });
      }
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
