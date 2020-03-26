import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService, JWT} from '../api/api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  changePwd: FormGroup;
  jwt: JWT = this.api.jwt;


  apiResponse: {
    success: boolean | null,
    name: string,
    created_at: string
  };

  userdata = {
    username: 'undefined',
    temps: 'undefined',
    salle: 0,
    points: 0,
    register_date: 'undefined'
  };

  isShown = true;

  togglePasswd() {
    this.isShown = !this.isShown;
  }


  constructor(private api: ApiService, private router: Router) {


  }

  ngOnInit(): void {
    if (this.api.jwt.connected) {
      this.getProfile();
    } else {
      this.router.navigateByUrl('/login');
    }
    this.changePwd = new FormGroup({
      actpwd: new FormControl(undefined, [Validators.required]),
      newpwd: new FormControl(undefined, [Validators.required]),
      newpwdconf: new FormControl(undefined, [Validators.required])
    });
  }

  get actpwd() {
    return this.changePwd.get('actpwd');
  }

  get newpwd() {
    return this.changePwd.get('newpwd');
  }

  get newpwdconf() {
    return this.changePwd.get('newpwdconf');
  }


  onSubmit() {
    const data = new FormData();
    data.append('currentpassword', this.changePwd.get('actpwd').value);
    data.append('newpassword', this.changePwd.get('newpwd').value);
    data.append('newpasswordconf', this.changePwd.get('newpwdconf').value);
    this.api.sendWithToken('POST', '/changepwd', data).then((response) => {
      return response.json();
    }).then((json) => {
      if (!json.success) {
        this.apiResponse = json;
      }
    });
  }


  getProfile(): void {
    this.api.sendWithToken('GET', '/me').then((response) => {
      return response.json();
    }).then((json) => {
      if (!json.success) {
        this.apiResponse = json;
      }
    });
  }

}
