import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  apiResponse: {
    success: boolean | null,
    message: string
  };

  constructor() {
  }

  onSubmit() {
    const data = new FormData();
    data.append('username', this.form.get('username').value);
    data.append('password', this.form.get('password').value);
    data.append('password_confirmation', this.form.get('password_confirmation').value);
    fetch('http://localhost:8000/api/register', {
      method: 'POST',
      body: data
    }).then((response) => {
      console.log(response);
      // return response.json();
    });
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      password_confirmation: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }

  get password_confirmation() {
    return this.form.get('password_confirmation');
  }

}
