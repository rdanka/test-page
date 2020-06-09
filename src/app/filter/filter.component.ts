import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { numberFormat } from 'highcharts';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})


export class FilterComponent implements OnInit {

  currentPeriod: string;
  currentType: string;
  dateToPass: Date;
  yearToPass: string;
  periodToPass: string;
  @Input() newDate: Date;
  @Output() dateEvent = new EventEmitter<{year: any, month: any, day: any, type: any}>();
  @Output() periodEvent = new EventEmitter<string>();

  periods = [ { id : '_1', periodName: 'Napi', type: "areaspline"}, { id : '_2', periodName: 'Havi', type: "column"},{ id : '_3', periodName: 'Évi', type: "column"}];
  years = ['2019','2020', '2021', '2022'];

  constructor() { }

  ngOnInit(): void {
    this.newDate = new Date();
    this.currentPeriod = '_1';
  }

  changePeriod(period: any) {

    this.currentPeriod = period;

    if (period === '_1') {
        this.currentType = "areaspline";
    } else {
        this.currentType = "column";
    }

    this.periodEvent.emit(this.currentPeriod);

    const dateInfo = {
      id: this.currentPeriod,
      year: this.newDate.getFullYear() ,
      month: this.newDate.getMonth() ,
      day: this.newDate.getDate() ,
      type: this.currentType
  };

    this.dateEvent.emit(dateInfo);
  }


  getDate() {
    const year = this.newDate.getFullYear();
    const month = this.newDate.getMonth()+1;
    const day = this.newDate.getDate();

    this.dateToPass = new Date(`${year}/${month}/${day}`);
    this.yearToPass  = String(year);

    if (!this.years.includes(String(year))) {
      this.years.push(String(year));
    }
  }

  changeDate(date) {
    let dateInfo;
      if (this.currentPeriod === '_3') {
         dateInfo = {
              id: this.currentPeriod,
              year: date,
              month: "",
              day: "",
              type: this.currentType
          };
      } else {
           dateInfo = {
              id: this.currentPeriod,
              year: date.getFullYear(),
              month: date.getMonth(),
              day: date.getDate(),
              type: this.currentType
          }
      }
      this.dateEvent.emit(dateInfo);
  }
}
