import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserTasksService {

  constructor(private _HttpClient:HttpClient) { }

  onGetAllTasks():Observable<any>{
    return this._HttpClient.get('Task/count')
  }
  onGetUserTasks(params: any):Observable<any> {
    return this._HttpClient.get('Task/', {params})
  }
  onChangeStatusTask(id:number,status:any):Observable<any>{
    return this._HttpClient.put(`Task/${id}/change-status`,{status})
  }
}
