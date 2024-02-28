import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  name: string = '';
  register = false;

  constructor(
    public authService: AuthService,
    private _snackbar: MatSnackBar,
    private _router: Router
  ) { }

  ngOnInit(): void { }

  onSubmit() {

    if (this.register) {
      this.authService.register(this.username, this.password, this.name)
        .subscribe(response => {
          if (response.status) {
            this._snackbar.open('Registered successfully!');
            this._snackbar.open('Please check your email to verify your account!');
          }
        })

    } else {

      this.authService.login(this.username, this.password)
        .subscribe((response) => {
          if (response.status) {
            this._snackbar.open('Logged in successfully!');
            this.authService.authenticate(response.payload);
            this._router.navigate(['dashboard']);
          }
        })
    }
  }

  switchForm(flag: boolean) {
    this.register = flag;
  }

}
