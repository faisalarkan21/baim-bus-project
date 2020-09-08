import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import { AgencyComponent } from '../pages/agency/agency.component';
import { TripsComponent } from '../pages/trips/trips.component';
import { ProfileComponent } from '../pages/profile/profile.component';
import { BusesComponent } from '../pages/buses/buses.component';
import { PageNotFoundComponent } from '../pages/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'agency', component: AgencyComponent},
  { path: 'trips', component: TripsComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'bus', component: BusesComponent},
  { path: 'page404', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class LayoutRoutingModule {}