import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor() {
  }

  onSubmit() {
    const data = new FormData();
    data.append('username', this.form.get('username').value);
    data.append('password', this.form.get('password').value);
    fetch('localhost:8000/login', {
      method: 'POST',
      body: data
    }).then((response) => {
      return response.json();
    }).then((json) => {
      console.log(json);
    });
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    });
  }

  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }

}
