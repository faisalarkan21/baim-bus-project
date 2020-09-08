import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AgencyComponent } from '../pages/agency/agency.component';
import { BusesComponent } from '../pages/buses/buses.component';
import { HomeComponent } from '../pages/home/home.component';
import { PageNotFoundComponent } from '../pages/page-not-found/page-not-found.component';
import { ProfileComponent } from '../pages/profile/profile.component';
import { TripsComponent } from '../pages/trips/trips.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    LayoutComponent,
    AgencyComponent,
    TripsComponent,
    ProfileComponent,
    BusesComponent,
    HomeComponent,
    PageNotFoundComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxDatatableModule,
    LayoutRoutingModule
  ],
})

export class LayoutModule { }