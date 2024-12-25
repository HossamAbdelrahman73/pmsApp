import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ResetRequestComponent } from './components/reset-request/reset-request.component';
import { VerfiyComponent } from './components/verfiy/verfiy.component';
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, title: 'Login' },
  { path: 'register', component: RegisterComponent, title: 'register' },
  {
    path: 'reset-request',
    component: ResetRequestComponent,
    title: 'reset request',
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
    title: 'reset password',
  },
  { path: 'verify-account', component: VerfiyComponent, title: 'verify account' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
