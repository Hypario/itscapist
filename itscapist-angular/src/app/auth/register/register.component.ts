import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../../app.component.scss', './register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  apiResponse: {
    success: boolean | null,
    message: string
  };

  constructor(private snackBar: MatSnackBar, private router: Router) {
  }

  onSubmit() {
    const data = new FormData();
    data.append('name', this.form.get('name').value);
    data.append('email', this.form.get('email').value);
    data.append('password', this.form.get('password').value);
    data.append('password_confirmation', this.form.get('password_confirmation').value);
    fetch('http://localhost:8000/api/register', {
      method: 'POST',
      body: data
    }).then((response) => {
      return response.json();
    }).then((json) => {
      if (!json.success) {
        this.apiResponse = json;
      } else {
        this.snackBar.open('Vous êtes maintenant inscris, vous pouvez maintenant vous connecter.', '', {
          duration: 5 * 1000
        });
        this.router.navigateByUrl('/login');
      }
    });
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern('[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}')
      ]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      password_confirmation: new FormControl(null, [Validators.required, Validators.minLength(8)])
    });
  }

  get name() {
    return this.form.get('name');
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  get password_confirmation() {
    return this.form.get('password_confirmation');
  }

}
