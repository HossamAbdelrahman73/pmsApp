import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import { ILogin } from '../interfaces/ILogin';
import { IResetPassword } from '../interfaces/IResetPassword';
import { IVerify } from '../interfaces/IVerify';
import { IChangepassword } from '../interfaces/ichangepassword';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  role: string | null = '';

  constructor(private _HttpClient: HttpClient, private _Router: Router) {
    if (localStorage.getItem('userToken') !== null) {
      this.getProfile();
    }
  }
  getProfile() {
    let token: any = localStorage.getItem('userToken');
    let decoded: any = jwtDecode(token);
    localStorage.setItem('email', decoded.userEmail);
    localStorage.setItem('role', decoded.userGroup);
    this.getRole();
  }
  getRole() {
    if (
      localStorage.getItem('userToken') !== null &&
      localStorage.getItem('role') !== null
    ) {
      this.role = localStorage.getItem('role');
    }
    return this.role;
  }
  onLogin(loginForm: ILogin): Observable<any> {
    return this._HttpClient.post('Users/Login', loginForm);
  }
  onRegister(registerForm: FormData): Observable<any> {
    return this._HttpClient.post('Users/Register', registerForm);
  }
  onResetRequest(resetReq: any): Observable<any> {
    return this._HttpClient.post('Users/Reset/Request', resetReq);
  }
  onResetPassword(resetPasswordForm: IResetPassword): Observable<any> {
    return this._HttpClient.post('Users/Reset', resetPasswordForm);
  }
  onVerifyAccount(verifyForm: IVerify): Observable<any> {
    return this._HttpClient.put('Users/verify', verifyForm);
  }
  onLogout(): void {
    localStorage.clear();
    this._Router.navigate(['/auth']);
  }
}
