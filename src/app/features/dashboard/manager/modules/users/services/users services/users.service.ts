import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private _HttpClient: HttpClient) {}
  getAllUsers(data: any): Observable<any> {
    return this._HttpClient.get('Users', { params: data });
  }
  getUsersOfManager(data: any): Observable<any> {
    return this._HttpClient.get('Users/Manager', { params: data });
  }
  createManager(form: FormData): Observable<any> {
    return this._HttpClient.post('Users/Create', form);
  }
  getUserById(id: number): Observable<any> {
    return this._HttpClient.get(`Users/${id}`);
  }

  blockUser(id: number): Observable<any> {
    return this._HttpClient.put(`Users/${id}`, { HttpParams: id });
  }
}
