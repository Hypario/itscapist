import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  csrftoken: string = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xOTIuMTY4LjEuNDA6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTU4NTE2ODk2NSwiZXhwIjoxNTg1MTcyNTY1LCJuYmYiOjE1ODUxNjg5NjUsImp0aSI6Ijhjc0Rnc05jeFMwZGM0cngiLCJzdWIiOjEsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.TKIIkD_sCs10A3JtjJ2--uSrqzcu6Zh2wCTWFjpjGgo";
  my_json = {};
  changePwd: FormGroup;

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
  


  constructor() { 
    
    if (this.csrftoken != "") {
    this.getProfile();
    }
  }

  ngOnInit(): void {
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
        "Authorization" : this.csrftoken
      }
    }).then((response) => {
      return response.json();
    }).then((json) => {
      if (!json.success) {
        this.apiResponse = json;
      }
    });
  }


  getProfile(): void  {
    fetch('http://localhost:8000/api/me', {
      method: 'GET',
      headers: {
        "Authorization" : this.csrftoken,
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
