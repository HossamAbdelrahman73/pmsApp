import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-reset-request',
  templateUrl: './reset-request.component.html',
  styleUrls: ['./reset-request.component.scss'],
})
export class ResetRequestComponent {
  email: string = '';
  resMsg: string = '';
  constructor(
    private _AuthService: AuthService,
    private _ToastrService: ToastrService,
    private _Router: Router
  ) {}
  onSubmit(form: NgForm) {
    if (form.valid) {
      const formData = form.value;
      this._AuthService.onResetRequest(formData).subscribe({
        next: (res) => {
          this.resMsg = res.message;
          localStorage.setItem('email', formData.email);
        },
        error: (err) => {
          this.resMsg = err.error.message;
          this._ToastrService.error(this.resMsg, 'Error');
        },
        complete: () => {
          this._ToastrService.success(this.resMsg, 'Reset Request');
          this._Router.navigate(['/auth/reset-password']);
        },
      });
    }
  }
}
