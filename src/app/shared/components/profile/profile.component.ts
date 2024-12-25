import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/services/auth.service';
import { HelperService } from '../../services/helper service/helper.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  files: File[] = [];
  resMessage: string = '';
  additionalInfo: any;
  imgSrc: any;
  hidePassword: boolean = false;
  hideConfirmPassword: boolean = false;
  profileForm = new FormGroup({
    userName: new FormControl(null, [
      Validators.required,
      Validators.pattern('^(?=.*[a-zA-Z])(?=.*\\d)[a-zA-Z0-9_.-]*$'),
    ]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    phoneNumber: new FormControl(null, Validators.required),
    country: new FormControl(null, Validators.required),

    confirmPassword: new FormControl(null, [
      Validators.required,
      Validators.pattern(
        '^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()-__+.]){1,}).{8,}$'
      ),
    ]),
    profileImage: new FormControl(null),
  });
  constructor(
    private _HelperService: HelperService,
    private _ToastrService: ToastrService,
    private _Router: Router,
    private _AuthService: AuthService
  ) {}
  ngOnInit(): void {
    this._HelperService.onGetCurrentUser().subscribe({
      next: (res) => {
        this.profileForm.patchValue(res);
      },
    });
  }
  onSelect(event: any) {
    this.files.push(...event.addedFiles);
    this.imgSrc = this.files[0];
  }
  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }
  onUpdate(data: FormGroup): void {
    let myData = new FormData();
    Object.keys(data.value).forEach((key) => {
      myData.append(key, data.value[key]);
    });
    if (this.files.length > 0) {
      myData.append('profileImage', this.files[0]);
    }
    this._HelperService.onUpdateProfile(myData).subscribe({
      next: (res) => {
        this.resMessage = res.message;
      },
      error: (err) => {
        this.resMessage = err.error.message;
        this.additionalInfo = err.error.additionalInfo;
        if (this.resMessage && !this.additionalInfo) {
          this._ToastrService.error(this.resMessage, 'Error');
        } else {
          const map = new Map(Object.entries(this.additionalInfo.errors));
          for (let [msg, val] of map) {
            this._ToastrService.error(JSON.stringify(val), msg);
          }
        }
      },
      complete: () => {
        this._ToastrService.success(this.resMessage, 'Success');
        if (this._AuthService.role === 'Manager') {
          this._Router.navigateByUrl('/dashboard/manager');
        } else {
          this._Router.navigateByUrl('/dashboard/employee');
        }
      },
    });
  }
}
