import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/utils/api.service';
import { AuthService } from 'src/app/auth.service';
import { ColumnMode, DatatableComponent, id } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent implements OnInit {

  temp: any;
  editing = {};
  rows : any = [];
  dataDropdownBus: any;
  dataDropdownStop: any;
  mydatatable: any;
  pureData: any;

  ColumnMode = ColumnMode;

  constructor(private api:ApiService,private auth: AuthService) {

  }

  ngOnInit(): void {
    let { agencyId } = this.auth.decodeJWT();
    this.api.getBusbyId(agencyId).subscribe((bus) => {

      console.log('bus',bus)
      this.dataDropdownBus = bus;
    })
    this.api.getAllStop(agencyId).subscribe((stop) => {
        console.log('stop',stop)
        this.dataDropdownStop = stop;
    })


    this.api.getTripId(agencyId).subscribe((d : any) => {
      console.log(d)

      let tempDataHeder = d.map((v) =>({
        busName: v.bus.code,
        busId: v.bus.id,
        stop: v.stop.name,
        stopDestination: v.stopDestination.name,
        fare: v.fare,
        journeyTime: v.journeyTime
      })) 
      console.log('tempDataHeder', tempDataHeder)
      this.temp = tempDataHeder;
      this.rows = tempDataHeder;
      this.pureData = d;
    })
  }

  updateValue(event, cell, rowIndex) {
    console.log('inline editing rowIndex', rowIndex);
    this.editing[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
    console.log('UPDATED! ROW', this.rows);
    console.log('UPDATED!', this.rows[rowIndex]);

    let copyBus = this.dataDropdownBus;
    const resultbus =  copyBus.find((x) => x.code === this.rows[rowIndex].busName)
    console.log('result', resultbus);
    let copyDataByIndex = this.pureData[rowIndex];
    console.log('copyDataByIndex', copyDataByIndex)
    copyDataByIndex.bus.id = resultbus.id;
    copyDataByIndex.busId = resultbus.id;
    console.log('copyDataByIndex after', copyDataByIndex)
    this.api.postUpdateTrips(copyDataByIndex).subscribe();
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    console.log('searh', val)
    // filter our data
    console.log('searhzz', this.rows)
    const temp = this.temp.filter(function (d) {
      return d.busName.toLowerCase().indexOf(val) !== -1 || !val;
    });
    
    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.mydatatable.offset = 0;
  }


}
