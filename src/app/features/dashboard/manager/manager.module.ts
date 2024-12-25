import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { ManagerRoutingModule } from './manager-routing.module';
import { ManagerComponent } from './manager.component';

@NgModule({
  declarations: [ManagerComponent],
  imports: [CommonModule, ManagerRoutingModule, SharedModule],
})
export class ManagerModule {}
