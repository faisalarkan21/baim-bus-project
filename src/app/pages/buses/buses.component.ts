import { Component, OnInit, ViewChild } from "@angular/core";
import { ApiService } from "src/app/utils/api.service";
import { AuthService } from "src/app/auth.service";
import { ColumnMode, DatatableComponent } from "@swimlane/ngx-datatable";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-buses",
  templateUrl: "./buses.component.html",
  styleUrls: ["./buses.component.css"],
})
export class BusesComponent implements OnInit {
  temp: any;
  editing = {};
  rows: any = [];
  mydatatable: any;
  code: string;
  capacity: string;
  make: string;
  ColumnMode = ColumnMode;
  modalReference: NgbModalRef;

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
    this.api.getBusbyId(agencyId).subscribe((d) => {
      this.temp = d;
      console.log(d);
      this.rows = d;
    });
  }

  updateValue(event, cell, rowIndex) {
    console.log("inline editing rowIndex", rowIndex);
    this.editing[rowIndex + "-" + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
    console.log("UPDATED! ROW", this.rows);
    console.log("UPDATED!", this.rows[rowIndex]);
    this.api.postUpdateBus(this.rows[rowIndex]).subscribe();
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    console.log("searh", val);
    // filter our data
    console.log("searhzz", this.rows);
    const temp = this.temp.filter(function (d) {
      return d.code.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.mydatatable.offset = 0;
  }

  deleteBus(id) {
    console.log("e", id);
    this.api.postDeleteBus(id).subscribe((d) => {
      this.fetchData();
    });
  }

  addRow(modalAdd) {
    console.log(modalAdd);
    this.modalReference = this.modalService.open(modalAdd);
  }

  save() {
    let { agencyId } = this.auth.decodeJWT();
    console.log("code", this.code, this.make, this.capacity);
    this.api
      .postAddBuses({
        code: this.code,
        make: this.make,
        capacity: this.capacity,
        id: null,
        agencyId,
      })
      .subscribe((d) => {
        this.fetchData();
        console.log("zzzzzz");
        this.modalReference.close();
        alert('Success')
      });
  }
}
