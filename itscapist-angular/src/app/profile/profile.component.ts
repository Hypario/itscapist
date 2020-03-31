import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../api/api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  changePwd: FormGroup;


  apiResponse: {
    success: boolean | null,
    name: string,
    created_at: string
  };

  save_response = undefined;

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
    if (this.api.isConnected()) {
      this.getProfile();
    } else {
      this.router.navigateByUrl('/login');
    }
    this.changePwd = new FormGroup({
      actpwd: new FormControl(undefined, [Validators.required, Validators.minLength(8)]),
      newpwd: new FormControl(undefined, [Validators.required, Validators.minLength(8)]),
      newpwdconf: new FormControl(undefined, [Validators.required, Validators.minLength(8)])
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
    console.warn("current token : "+this.api.jwt.token);
    this.api.getUser().then((json) => {
      if (!json.success) {
        this.apiResponse = json;
      }
    });
    this.api.sendWithToken('GET','/save',undefined).then((response) => {
      return response.json();
    }).then((json) => {
      if (json.save != undefined) {
      this.save_response = JSON.parse(json.save);
      }
    });
  }

  logout(): void {
    this.api.logout();
    this.router.navigateByUrl("/");
  }

  delsave(): void {
    this.api.sendWithToken("DELETE","/save",undefined).then((response)=> {
      return response.json();
    }).then((json) => {
      console.warn("État de la suppression : "+json.message);
    });
    this.router.navigateByUrl("/");
  }

}
