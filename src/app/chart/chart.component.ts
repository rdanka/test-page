import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as Highcharts from "highcharts";


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})

export class ChartComponent  {
/*async getData(){
     const res = await fetch('../../assets/testDB.csv');
     const data = await res.text();
     console.log(data);
   } */
   @Input() type: any;
   @Input() date: Date;
   dates: Date;
   barType: any = "column";
   currentPeriod: string;
    chartData =  [
      { date: new Date("2020/05/29"), data: [1, 0, 0, 0, 0, 0, 0, 0, 9, 10, 11, 12, 13, 14, 14.7, 18.9, 15, 16, 17, 15, 15.5, 16, 17, 22, 23, 24, 17, 16, 12, 10, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
      { date: new Date("2020/05/30"), data: [2, 0, 0, 0, 0, 0, 0, 0, 28, 12, 27, 25, 21, 17, 28, 13, 28, 21, 26, 12, 28, 19, 19, 24, 25, 11, 15, 26, 25, 26, 22, 32, 4, 0, 0, 0, 0, 0, 0, 0, 0] },
      { date: new Date("2020/05/31"), data: [3, 0, 0, 0, 0, 0, 0, 0, 11, 18, 13, 23, 11, 13, 17, 12, 14, 17, 17, 22, 29, 23, 22, 13, 18, 13, 26, 11, 22, 14, 28, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
      { date: new Date("2020/06/01"), data: [4, 0, 0, 0, 0, 0, 0, 0, 9, 10, 11, 12, 13, 14, 14.7, 18.9, 15, 16, 17, 15, 15.5, 16, 17, 22, 23, 24, 17, 16, 12, 10, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
      { date: new Date("2020/06/02"), data: [1, 0, 0, 0, 0, 0, 0, 0, 9, 10, 11, 12, 13, 14, 14.7, 18.9, 15, 16, 17, 15, 15.5, 16, 17, 22, 23, 24, 17, 16, 12, 10, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
      { date: new Date("2020/06/03"), data: [2, 0, 0, 0, 0, 0, 0, 0, 28, 12, 27, 25, 21, 17, 28, 13, 28, 21, 26, 12, 28, 19, 19, 24, 25, 11, 15, 26, 25, 26, 22, 32, 4, 0, 0, 0, 0, 0, 0, 0, 0] },
      { date: new Date("2020/06/04"), data: [3, 0, 0, 0, 0, 0, 0, 0, 11, 18, 13, 23, 11, 13, 17, 12, 14, 17, 17, 22, 29, 23, 22, 13, 18, 13, 26, 11, 22, 14, 28, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
      { date: new Date("2020/06/05"), data: [4, 0, 0, 0, 0, 0, 0, 0, 9, 10, 11, 12, 13, 14, 14.7, 18.9, 15, 16, 17, 15, 15.5, 16, 17, 22, 23, 24, 17, 16, 12, 10, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
      { date: new Date("2020/06/06"), data: [1, 0, 0, 0, 0, 0, 0, 0, 9, 10, 11, 12, 13, 14, 14.7, 18.9, 15, 16, 17, 15, 15.5, 16, 17, 22, 23, 24, 17, 16, 12, 10, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
      { date: new Date("2020/06/07"), data: [2, 0, 0, 0, 0, 0, 0, 0, 28, 12, 27, 25, 21, 17, 28, 13, 28, 21, 26, 12, 28, 19, 19, 24, 25, 11, 15, 26, 25, 26, 22, 32, 4, 0, 0, 0, 0, 0, 0, 0, 0] },
      { date: new Date("2020/06/08"), data: [3, 0, 0, 0, 0, 0, 0, 0, 11, 18, 13, 23, 11, 13, 17, 12, 14, 17, 17, 22, 29, 23, 22, 13, 18, 13, 26, 11, 22, 14, 28, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
      { date: new Date("2020/06/09"), data: [4, 0, 0, 0, 0, 0, 0, 0, 9, 10, 11, 12, 13, 14, 14.7, 18.9, 15, 16, 17, 15, 15.5, 16, 17, 22, 23, 24, 17, 16, 12, 10, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
      { date: new Date("2020/06/10"), data: [1, 0, 0, 0, 0, 0, 0, 0, 9, 10, 11, 12, 13, 14, 14.7, 18.9, 15, 16, 17, 15, 15.5, 16, 17, 22, 23, 24, 17, 16, 12, 10, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
      { date: new Date("2020/06/11"), data: [2, 0, 0, 0, 0, 0, 0, 0, 28, 12, 27, 25, 21, 17, 28, 13, 28, 21, 26, 12, 28, 19, 19, 24, 25, 11, 15, 26, 25, 26, 22, 32, 4, 0, 0, 0, 0, 0, 0, 0, 0] },
      { date: new Date("2020/06/12"), data: [3, 0, 0, 0, 0, 0, 0, 0, 11, 18, 13, 23, 11, 13, 17, 12, 14, 17, 17, 22, 29, 23, 22, 13, 18, 13, 26, 11, 22, 14, 28, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
      { date: new Date("2020/06/13"), data: [4, 0, 0, 0, 0, 0, 0, 0, 9, 10, 11, 12, 13, 14, 14.7, 18.9, 15, 16, 17, 15, 15.5, 16, 17, 22, 23, 24, 17, 16, 12, 10, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
      { date: new Date("2020/06/14"), data: [4, 0, 0, 0, 0, 0, 0, 0, 9, 10, 11, 12, 13, 14, 14.7, 18.9, 15, 16, 17, 15, 15.5, 16, 17, 22, 23, 24, 17, 16, 12, 10, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
      { date: new Date("2020/06/15"), data: [1, 0, 0, 0, 0, 0, 0, 0, 9, 10, 11, 12, 13, 14, 14.7, 18.9, 15, 16, 17, 15, 15.5, 16, 17, 22, 23, 24, 17, 16, 12, 10, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
      { date: new Date("2020/06/16"), data: [2, 0, 0, 0, 0, 0, 0, 0, 28, 12, 27, 25, 21, 17, 28, 13, 28, 21, 26, 12, 28, 19, 19, 24, 25, 11, 15, 26, 25, 26, 22, 32, 4, 0, 0, 0, 0, 0, 0, 0, 0] },
      { date: new Date("2020/06/17"), data: [3, 0, 0, 0, 0, 0, 0, 0, 11, 18, 13, 23, 11, 13, 17, 12, 14, 17, 17, 22, 29, 23, 22, 13, 18, 13, 26, 11, 22, 14, 28, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
      { date: new Date("2020/06/18"), data: [4, 0, 0, 0, 0, 0, 0, 0, 9, 10, 11, 12, 13, 14, 14.7, 18.9, 15, 16, 17, 15, 15.5, 16, 17, 22, 23, 24, 17, 16, 12, 10, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] }
    ];
   Highcharts: typeof Highcharts = Highcharts;
   updateFlag: boolean = true;
   chartOptions: Highcharts.Options = {
      title: {
         text: null
      },
      yAxis: {
        title: null
      },
     series: [{
       data: [4, 0, 0, 0, 0, 0, 0, 0, 9, 10, 11, 12, 13, 14, 14.7, 18.9, 15, 16, 17, 15, 15.5, 16, 17, 22, 23, 24, 17, 16, 12, 10, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
       type: 'areaspline',
       showInLegend: false,  
     }],
   };

   refresh() {
      this.chartOptions = {
         series: [{
            type: this.type
          }]
      }
   }

   nextDate(){
    if (this.currentPeriod === '_1') {
      this.date.setDate(this.date.getDate()+1); 
   } else if (this.currentPeriod === '_2') {
      this.date.setMonth(this.date.getMonth()+1); 
   } else {
      this.date.setFullYear(this.date.getFullYear()+1);
   }
     for(let i = 0; i < this.chartData.length; i++){
       
       if (this.chartData[i].date.getTime() == this.date.getTime()) {
        this.chartOptions = {
          series: [{
             type: this.type,
             data: this.chartData[i].data
           }]
       }
       
       }
       console.log(this.date);
       console.log(this.chartData[i].date);
     }
     

   }

   previousDate(){
    if (this.currentPeriod === '_1') {
      this.date.setDate(this.date.getDate()-1); 
   } else if (this.currentPeriod === '_2') {
      this.date.setMonth(this.date.getMonth()-1); 
   } else {
      this.date.setFullYear(this.date.getFullYear()-1);
   }
    for(let i = 0; i < this.chartData.length; i++){
      if (this.chartData[i].date.getTime() == this.date.getTime()) {
       this.chartOptions = {
         series: [{
            type: this.type,
            data: this.chartData[i].data
          }]
      }
      }
    }

   }

   getDate($event){
      this.currentPeriod = $event.id;
   }

  ngOnInit() {}

  
}