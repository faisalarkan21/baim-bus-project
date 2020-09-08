import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/utils/api.service';
import { AuthService } from 'src/app/auth.service';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-buses',
  templateUrl: './buses.component.html',
  styleUrls: ['./buses.component.css']
})

export class BusesComponent implements OnInit {
  temp: any;
  editing = {};
  rows : any = [];
  mydatatable: any;

  ColumnMode = ColumnMode;

  constructor(private api:ApiService,private auth: AuthService) {

  }

  ngOnInit(): void {
    let { agencyId } = this.auth.decodeJWT();
    this.api.getBusbyId(agencyId).subscribe((d) => {
      this.temp = d;
      console.log(d)
      this.rows = d;
    })
  }

  updateValue(event, cell, rowIndex) {
    console.log('inline editing rowIndex', rowIndex);
    this.editing[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
    console.log('UPDATED! ROW', this.rows);
    console.log('UPDATED!', this.rows[rowIndex]);
    this.api.postUpdateBus(this.rows[rowIndex]).subscribe();
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    console.log('searh', val)
    // filter our data
    console.log('searhzz', this.rows)
    const temp = this.temp.filter(function (d) {
      return d.code.toLowerCase().indexOf(val) !== -1 || !val;
    });
    
    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.mydatatable.offset = 0;
  }

}
