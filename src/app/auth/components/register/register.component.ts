import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { routes } from 'src/app/shared/interfaces/routes.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  hideEye1: boolean = true;
  hideEye2: boolean = true;
  imgSrc: any;
  files: File[] = [];
  registerForm = new FormGroup({
    userName: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
    phoneNumber: new FormControl(null, Validators.required),
    country: new FormControl(null, Validators.required),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(
        '^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()-__+.]){1,}).{8,}$'
      ),
    ]),
    confirmPassword: new FormControl(null, [
      Validators.required,
      Validators.pattern(
        '^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()-__+.]){1,}).{8,}$'
      ),
    ]),
    profileImage: new FormControl(null),
  });
  resMessage: string = '';
  constructor(
    private _AuthService: AuthService,
    private _ToastrService: ToastrService,
    private _Router: Router
  ) {}

  onSelect(event: any) {
    this.files.push(...event.addedFiles);
    this.imgSrc = this.files[0];
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  onRegister(data: FormGroup): void {
    let myData = new FormData();
    Object.keys(data.value).forEach((key) => {
      myData.append(key, data.value[key]);
    });
    if (this.files.length > 0) {
      myData.append('profileImage', this.files[0]);
    }

    this._AuthService.onRegister(myData).subscribe({
      next: (res) => {
        this.resMessage = res.message;
        const email = data.value.email;
        localStorage.setItem('email', email);
      },
      error: (err) => {
        if (err.error.message && !err.error.additionalInfo) {
          this._ToastrService.error(err.error.message, 'Error');
        } else {
          const map = new Map(Object.entries(err.error.additionalInfo.errors));
          for (let [msg, val] of map) {
            this._ToastrService.error(JSON.stringify(val), msg);
          }
        }
      },
      complete: () => {
        this._ToastrService.success(this.resMessage, 'Success');
        this._Router.navigateByUrl('/auth/verify-account');
      },
    });
  }
  public get getRoutes(): typeof routes {
    return routes
  }
}
