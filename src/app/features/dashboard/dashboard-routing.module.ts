import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { employeeGuard } from 'src/app/core/guards/employee guard/employee.guard';
import { managerGuard } from 'src/app/core/guards/manager guard/manager.guard';
import { ProfileComponent } from 'src/app/shared/components/profile/profile.component';
import { DashboardComponent } from './dashboard.component';
const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'manager',
        canActivate: [managerGuard],
        loadChildren: () =>
          import('./manager/manager.module').then((m) => m.ManagerModule),
      },
      {
        path: 'employee',
        canActivate: [employeeGuard],
        loadChildren: () =>
          import('./employee/employee.module').then((m) => m.EmployeeModule),
      },
      { path: 'profile', component: ProfileComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
