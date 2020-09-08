import { Component, OnInit, ViewChild } from "@angular/core";
import { ApiService } from "src/app/utils/api.service";
import { AuthService } from "src/app/auth.service";
import { ColumnMode, DatatableComponent, id } from "@swimlane/ngx-datatable";
import { NgbModalRef, NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-trips",
  templateUrl: "./trips.component.html",
  styleUrls: ["./trips.component.css"],
})
export class TripsComponent implements OnInit {
  temp: any;
  editing = {};
  rows: any = [];
  dataDropdownBus: any;
  dataDropdownStop: any;
  mydatatable: any;
  pureData: any;
  modalReference: NgbModalRef;
  bus: string;
  stopDestination: string;
  stop: string;
  journeyTime: number;
  fare: number;
  ColumnMode = ColumnMode;

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    let { agencyId } = this.auth.decodeJWT();
    this.api.getBusbyId(agencyId).subscribe((bus) => {
      console.log("bus", bus);
      this.dataDropdownBus = bus;
    });
    this.api.getAllStop(agencyId).subscribe((stop) => {
      console.log("stop", stop);
      this.dataDropdownStop = stop;
    });

    this.api.getTripId(agencyId).subscribe((d: any) => {
      console.log(d);

      let tempDataHeder = d.map((v) => ({
        id: v.id,
        busName: v.bus.code,
        busId: v.bus.id,
        stop: v.stop.name,
        stopDestination: v.stopDestination.name,
        fare: v.fare,
        journeyTime: v.journeyTime,
      }));
      console.log("tempDataHeder", tempDataHeder);
      this.temp = tempDataHeder;
      this.rows = tempDataHeder;
      this.pureData = d;
    });
  }

  updateValue(event, cell, rowIndex) {
    console.log("inline editing rowIndex", rowIndex);
    this.editing[rowIndex + "-" + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
    console.log("UPDATED! ROW", this.rows);
    console.log("UPDATED!", cell, this.rows[rowIndex][cell]);

    let copyBus = this.dataDropdownBus;
    const resultbus = copyBus.find(
      (x) => x.code === this.rows[rowIndex].busName
    );

    let copyStop = this.dataDropdownStop;
    const resultStop = copyStop.find(
      (x) => x.name === this.rows[rowIndex].stop
    );
    const resultStopDestination = copyStop.find(
      (x) => x.name === this.rows[rowIndex].stopDestination
    );

    console.log("result", resultStop);
    let copyDataByIndex = this.pureData[rowIndex];
    console.log("copyDataByIndex", copyDataByIndex);
    copyDataByIndex.busId = resultbus.id;
    copyDataByIndex.sourceStopId = resultStop.id;
    copyDataByIndex.destStopId = resultStopDestination.id;
    copyDataByIndex[cell] = this.rows[rowIndex][cell];
    console.log("copyDataByIndex after", copyDataByIndex);
    this.api.postUpdateTrips(copyDataByIndex).subscribe();
  }

  deleteTrips(id) {
    console.log("e", id);
    this.api.postDeleteTrips(id).subscribe((d) => {
      this.fetchData();
    });
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    console.log("searh", val);
    // filter our data
    console.log("searhzz", this.rows);
    const temp = this.temp.filter(function (d) {
      return d.busName.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.mydatatable.offset = 0;
  }

  save() {
    // console.log(this.bus, this.stopDestination, this.journeyTime, this.fare);
    let { agencyId } = this.auth.decodeJWT();
    const constructObject = {
      agencyId,
      bus: this.dataDropdownBus.find(x => x.code === this.bus),
      fare: this.fare,
      journeyTime: this.journeyTime,
      stop: this.dataDropdownStop.find(x => x.name === this.stop),
      stopDestination:  this.dataDropdownStop.find(x => x.name === this.stopDestination)

    }

    this.api.postAddTrip(constructObject).subscribe((d) => {
      this.fetchData()
      this.modalReference.close();
      alert('Success')
    })
  }

  addRow(modalAdd) {
    console.log(modalAdd);
    this.modalReference = this.modalService.open(modalAdd);
  }
}
