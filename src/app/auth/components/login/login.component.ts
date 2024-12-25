import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { routes } from 'src/app/shared/interfaces/routes.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private _AuthService: AuthService,
    private _ToastrService: ToastrService,
    private _Router: Router
  ) {}
  hide: boolean = true;
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
      ),
    ]),
  });
  ngOnInit(): void {
    const email = localStorage.getItem('email');
    if (email) {
      this.loginForm.get('email')!.setValue(email || '');
    }
  }
  public get formData(): {
    [key: string]: AbstractControl<any, any>;
  } {
    return this.loginForm.controls;
  }
  login(data: FormGroup) {
    if (data.valid) {
      this._AuthService.onLogin(data.value).subscribe({
        next: (res) => {
          localStorage.setItem('userToken', res.token);
          this._AuthService.getProfile();
        },
        error: (err) => {
          const errors = err.error.errors;
          if (errors) {
            if (errors.email) {
              this._ToastrService.error(errors.email, 'Email Error');
            } else if (errors.password) {
              this._ToastrService.error(errors.password, 'Password Error');
            }
          } else {
            this._ToastrService.error(
              err.error.message || 'An unexpected error occurred',
              'Error'
            );
          }
        },
        complete: () => {
          this._ToastrService.success('Login successful!', 'Success');
          if (this._AuthService.role === 'Manager') {
            this._Router.navigate(['/dashboard/manager']);
          } else {
            this._Router.navigate(['/dashboard/employee']);
          }
        },
      });
    }
  }
  public get getRoutes(): typeof routes {
    return routes
  }
}
