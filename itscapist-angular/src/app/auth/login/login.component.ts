import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {ApiService} from '../../api/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../app.component.scss', './login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  apiResponse: {
    success: boolean | null,
    message: string
  };

  constructor(private snackBar: MatSnackBar, private router: Router, private api: ApiService) {
  }

  onSubmit() {
    const data = new FormData();
    data.append('email', this.form.get('email').value);
    data.append('password', this.form.get('password').value);
    this.api.send('POST', '/login', data)
      .then((response) => {
        return response.json();
      }).then((json) => {
      if (!json.success) {
        this.apiResponse = json;
      } else {
        this.snackBar.open('Vous êtes maintenant connecté.', '', {
          duration: 5 * 1000
        });
        this.api.setToken(json.access_token, json.token_type);
        this.router.navigateByUrl('/');
      }
    });
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern('[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}')
      ]),
      password: new FormControl(null, [Validators.required])
    });
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

}
