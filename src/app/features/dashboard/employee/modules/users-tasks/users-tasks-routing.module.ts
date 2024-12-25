import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersTasksComponent } from './users-tasks.component';

const routes: Routes = [{ path: '', component: UsersTasksComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersTasksRoutingModule { }
