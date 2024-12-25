import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersTasksRoutingModule } from './users-tasks-routing.module';
import { UsersTasksComponent } from './users-tasks.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    UsersTasksComponent
  ],
  imports: [
    CommonModule,
    UsersTasksRoutingModule,
    SharedModule
  ]
})
export class UsersTasksModule { }
