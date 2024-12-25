import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagerProjectsComponent } from './manager-projects.component';
import { CreateNewProjectComponent } from './components/create-new-project/create-new-project.component';
import { ViewProjectComponent } from './components/view-project/view-project.component';

const routes: Routes = [{ path: '', component: ManagerProjectsComponent },
  {path: 'create-project/:id', component: CreateNewProjectComponent, title:'create new project' },
  {path: 'create-project', component: CreateNewProjectComponent, title:'create new project' },
  {path: 'view-project/:id', component: ViewProjectComponent, title:'create new project' }



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerProjectsRoutingModule { }
