import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private _HttpClient: HttpClient) {}

  getAllTasks(parms: any): Observable<any> {
    return this._HttpClient.get('Task/manager', {
      params: parms,
    });
  }

  addTask(data: any): Observable<any> {
    return this._HttpClient.post('Task', data);
  }

  getTaskById(id: number): Observable<any> {
    return this._HttpClient.get(`Task/${id}`);
  }
  updateTaskById(id: number, data: any): Observable<any> {
    delete data.projectId;
    return this._HttpClient.put(`Task/${id}`, data);
  }

  deleteTask(id: number): Observable<any> {
    return this._HttpClient.delete(`Task/${id}`);
  }

  getUsers(data: any): Observable<any> {
    return this._HttpClient.get('Users', {
      params: data,
    });
  }

  getProjects(data: any) {
    return this._HttpClient.get('Project/manager', {
      params: data,
    });
  }
}
