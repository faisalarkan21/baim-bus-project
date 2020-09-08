import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { ApiService } from 'src/app/utils/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Agency } from 'src/app/entity/Agency';

@Component({
  selector: 'app-agency',
  templateUrl: './agency.component.html',
  styleUrls: ['./agency.component.css'],
})
export class AgencyComponent implements OnInit {
  name: string;
  details: string;
  agency: Agency;

  constructor(
    private route: ActivatedRoute,
    private myRouter: Router,
    public auth: AuthService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.getAgency();
  }

  getAgency() {
    let jwt = this.auth.decodeJWT();
    console.log('jwt', jwt);
    this.apiService.getAgencybyId(jwt.agencyId)
      .subscribe((agency) => {
        console.log('agency', agency);
        this.agency = agency;
    });
  }

  updateAgency(id){
    let jwt=this.auth.decodeJWT(); 
    console.log("agency",this.agency.id,this.agency.name, this.agency.details);
      this.apiService.editAgencybyId(jwt.agencyId,{id: this.agency.id,name:this.agency.name, details:this.agency.details}).subscribe((agency)=>{
        this.apiService.getAgencybyId(jwt.agencyId).subscribe((agency)=>{
          console.log('agency',agency)
          this.agency=agency
          alert("Data Agency Telah Di Update")
        })
    })
  }
}
