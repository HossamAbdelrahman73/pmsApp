import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { AddManagerComponent } from './components/add-manager/add-manager.component';
import { BlockUserComponent } from './components/block-user/block-user.component';
import { ViewUserComponent } from './components/view-user/view-user.component';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';

@NgModule({
  declarations: [
    UsersComponent,
    ViewUserComponent,
    AddManagerComponent,
    BlockUserComponent,
  ],

  imports: [CommonModule, UsersRoutingModule, SharedModule],
})
export class UsersModule {}
