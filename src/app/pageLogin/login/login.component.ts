import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { ApiService } from 'src/app/utils/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(
    private myRoute : Router,
    public auth: AuthService,
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    if (this.auth.isLoggedIn()) {
      this.myRoute.navigate(["/"]);
    }
  }

  doLogin(){
    this.apiService
      .postAuth(this.email, this.password)
      .subscribe(({data}: any) => {
        this.auth.sendToken(data);
        this.myRoute.navigate(["/"]);
        alert("Anda Berhasil Login")
      })
  }


}
