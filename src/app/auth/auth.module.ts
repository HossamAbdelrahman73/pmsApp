import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ResetRequestComponent } from './components/reset-request/reset-request.component';
import { VerfiyComponent } from './components/verfiy/verfiy.component';
import { AuthComponent } from './auth.component';
@NgModule({
  declarations: [
    ResetRequestComponent,
    RegisterComponent,
    LoginComponent,
    ResetPasswordComponent,
    VerfiyComponent,
    AuthComponent,
  ],
  imports: [CommonModule, AuthRoutingModule, SharedModule ],
})
export class AuthModule {}
