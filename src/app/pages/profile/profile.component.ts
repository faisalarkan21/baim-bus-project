import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/utils/api.service';
import { AuthService } from 'src/app/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../entity/User'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  name: string;
  details: string;
  user: User;

  constructor(
    private route: ActivatedRoute,
    private myRouter: Router,
    public auth: AuthService,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    let jwt = this.auth.decodeJWT();
    console.log('jwt', jwt);
    this.apiService.getUserbyId(jwt.userId)
      .subscribe((user) => {
        console.log('user', user);
        this.user = user;
    });
  }

}
