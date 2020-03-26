import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService,JWT} from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  changePwd: FormGroup;
  jwt: JWT = this.auth.jwt;
  

  apiResponse: {
    success: boolean | null,
    name: string, 
    created_at: string
  };

  userdata = {
    "username" : "undefined",
    "temps" : "undefined",
    "salle" : 0,
    "points" : 0,
    "register_date" : "undefined"
  };

  isShown: boolean = true;

  togglePasswd() {
    this.isShown = !this.isShown;
  }
  


  constructor(private auth: AuthService, private router: Router) { 
    
    
  }

  ngOnInit(): void {
    if (this.auth.jwt.connected) {
      this.getProfile(this.auth.jwt.token, this.jwt.token_type);
      } else {
        this.router.navigate(["/login"]);
      }
    this.changePwd = new FormGroup({
      actpwd: new FormControl(undefined, [Validators.required]),
      newpwd:  new FormControl(undefined, [Validators.required]),
      newpwdconf:  new FormControl(undefined, [Validators.required])
    });
  }

  get actpwd() {
    return this.changePwd.get("actpwd");
  }
  get newpwd() {
    return this.changePwd.get("newpwd");
  }
  get newpwdconf() {
    return this.changePwd.get("newpwdconf");
  }


  onSubmit() {
    const data = new FormData();
    data.append('currentpassword', this.changePwd.get('actpwd').value);
    data.append('newpassword', this.changePwd.get('newpwd').value);
    data.append('newpasswordconf', this.changePwd.get('newpwdconf').value);
    fetch('http://localhost:8000/api/changepwd', {
      method: 'POST',
      body: data,
      headers: {
        "Authorization" : this.jwt.token
      }
    }).then((response) => {
      return response.json();
    }).then((json) => {
      if (!json.success) {
        this.apiResponse = json;
      }
    });
  }


  getProfile(token: string, token_type:string): void  {
    fetch('http://localhost:8000/api/me', {
      method: 'GET',
      headers: {
        "Authorization" : token_type + " "+token,
        "Accept" : "application/json"
      }
    }).then((response) => {
      return response.json();
    }).then((json) => {
      if (!json.success) {
        this.apiResponse = json;
      }
    });
  }

}
