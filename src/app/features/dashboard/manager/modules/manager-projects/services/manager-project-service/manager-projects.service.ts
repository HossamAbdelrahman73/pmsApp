import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProject } from '../../interfaces/iproject';

@Injectable({
  providedIn: 'root',
})
export class ManagerProjectsService {
  constructor(private _HttpClient: HttpClient) {}
  onGetAllProjects(param:any): Observable<any> { return this._HttpClient.get('Project/',{params:param})}
  onCreateNewProject(infoProject: IProject): Observable<any> {
    return this._HttpClient.post('Project', infoProject);
  }
  onEditProject(infoProject: IProject, id: number): Observable<any>  {
    return this._HttpClient.put(`Project/${id}`,infoProject)
  }
  onGetProjectById(id: number): Observable<any>  {
    return this._HttpClient.get(`Project/${id}`)
  }
  onDeleteProjects(id: number): Observable<any>  {
    return this._HttpClient.delete(`Project/${id}`)
  }
  onGetMyProjectsForManager(param:any): Observable<any> {
    return this._HttpClient.get('Project/manager',{params:param})
  }
}
