import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginComponent } from './components/login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SignupComponent } from './components/signup/signup.component';

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [AuthRoutingModule, CommonModule, SharedModule],
})
export class AuthModule {}
