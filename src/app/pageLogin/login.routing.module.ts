import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from '../pageLogin/login/login.component';
import { RegistrasiComponent } from '../pageLogin/registrasi/registrasi.component';
import { Page404Component } from '../page404/page404.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrasiComponent },
  { path: 'page404', component: Page404Component }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }