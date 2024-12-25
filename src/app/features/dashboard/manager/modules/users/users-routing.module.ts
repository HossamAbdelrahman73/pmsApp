import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddManagerComponent } from './components/add-manager/add-manager.component';
import { UsersComponent } from './users.component';

const routes: Routes = [
  { path: '', component: UsersComponent },
  { path: 'add-manager', component: AddManagerComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
