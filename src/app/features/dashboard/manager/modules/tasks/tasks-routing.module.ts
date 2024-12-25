import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksComponent } from './tasks.component';
import { AddTaskComponent } from './components/add-edit-task/add-task.component';

const routes: Routes = [
  { path: '', component: TasksComponent },
  { path: 'edit-task/:id', component: AddTaskComponent },
  { path: 'add-task', component: AddTaskComponent },
  // { path: 'add-task', component: AddTaskComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TasksRoutingModule {}
