import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IChangepassword } from 'src/app/auth/interfaces/ichangepassword';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  constructor(private _HttpClient: HttpClient) {}

  onGetCurrentUser(): Observable<any> {
    return this._HttpClient.get('Users/currentUser');
  }

  //may be we will not use this function
  onGetAllProjects(data: any): Observable<any> {
    return this._HttpClient.get('Project', data);
  }
  onChangePassword(changePasswordForm: IChangepassword): Observable<any> {
    return this._HttpClient.put('Users/ChangePassword', changePasswordForm);
  }
  OnGetUserCount(): Observable<any> {
    return this._HttpClient.get('Users/count');
  }
  onTsksCount(): Observable<any> {
    return this._HttpClient.get('Task/count');
  }
  onUpdateProfile(profileForm: FormData): Observable<any> {
    return this._HttpClient.put('Users', profileForm);
  }
}
