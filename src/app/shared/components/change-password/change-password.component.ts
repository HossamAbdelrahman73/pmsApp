import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormControlOptions, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/services/auth.service';
import { HelperService } from '../../services/helper service/helper.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  constructor(
    private _AuthService: AuthService,
    private _HelperService: HelperService,
    private _ToastrService: ToastrService,
    private _Router: Router
  ) {}
  hideOldPassword: boolean = true;
  hideNewPassword: boolean = true;
  hideConfirmNewPassword: boolean = true;
  resMessage: string = '';
  changePasswordForm: FormGroup = new FormGroup(
    {
      oldPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
        ),
      ]),
      confirmNewPassword: new FormControl('', [Validators.required]),
    },
    { validator: [this.checkPassword] } as FormControlOptions
  );
  public get formData(): {
    [key: string]: AbstractControl<any, any>;
  } {
    return this.changePasswordForm.controls;
  }
  checkPassword(group: AbstractControl) {
    const newPassword = group.get('newPassword');
    const confirmNewPassword = group.get('confirmNewPassword');
    if (confirmNewPassword?.value === '') {
      confirmNewPassword?.setErrors({ required: true });
    } else if (confirmNewPassword?.value !== newPassword?.value) {
      confirmNewPassword?.setErrors({ mismatch: true });
    }
  }
  changePassword(data: FormGroup): void {
    if (this.changePasswordForm.valid) {
      this._HelperService.onChangePassword(data.value).subscribe({
        next: (res) => {
          this.resMessage = res.message;
        },
        error: (err) => {
          console.log(err);
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
          this._ToastrService.success(this.resMessage, 'Reset Password');
          this._AuthService.onLogout()
        },
      });
    }
  }
}
