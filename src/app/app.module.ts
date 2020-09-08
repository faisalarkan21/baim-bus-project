import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { LayoutModule } from './layout/layout.module';
import { LoginModule } from './pageLogin/login.module';
import { Page404Component } from './page404/page404.component';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    Page404Component,
    // LoginComponent,
    // RegistrasiComponent,
    // HomeComponent,
    // LayoutComponent,
    // ButtonComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    BrowserModule,
    LoginModule,
    AppRoutingModule,
    LayoutModule,
    HttpClientModule,
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
