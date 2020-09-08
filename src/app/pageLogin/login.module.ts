import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from '../pageLogin/login.routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { RegistrasiComponent } from '../pageLogin/registrasi/registrasi.component';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
  ],
  declarations: [LoginComponent, RegistrasiComponent]
})
export class LoginModule { }