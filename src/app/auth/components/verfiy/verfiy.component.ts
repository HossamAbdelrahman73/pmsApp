import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-verfiy',
  templateUrl: './verfiy.component.html',
  styleUrls: ['./verfiy.component.scss'],
})
export class VerfiyComponent {
  resMessage: string = '';
  verifyAccountForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    code: new FormControl('', [Validators.required]),
  });
  constructor(
    private _AuthService: AuthService,
    private _ToastrService: ToastrService,
    private _Router: Router
  ) {}
  ngOnInit(): void {
    const email = localStorage.getItem('email');
    this.verifyAccountForm.get('email')!.setValue(email || '');
  }
  onVerify(verifyAccountForm: FormGroup): void {
    if (verifyAccountForm.valid) {
      this._AuthService.onVerifyAccount(verifyAccountForm.value).subscribe({
        next: (res) => {
          this.resMessage = res.message;
        },
        error: (err) => {
          this._ToastrService.error(
            err.message || 'An unexpected error occurred',
            'Error'
          );
        },
        complete: () => {
          this._ToastrService.success(this.resMessage, 'Account Verified');
          this._Router.navigateByUrl('/auth/login');
        },
      });
    }
  }
}
