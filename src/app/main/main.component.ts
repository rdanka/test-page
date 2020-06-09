import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  message: string;
  charType = 'column'
  day: Date;
  
  constructor() { }

  ngOnInit(): void {
  }

  receiveMessage($event) {
    this.message = `${$event.year}.${$event.month+1}.${$event.day} ${$event.type}`;
    this.charType = $event.type;
    if( $event.id === '_3') {
      this.day = new Date(`${$event.year}/${this.day.getMonth()+1}/${this.day.getDate()}`);
    }else {
      this.day = new Date(`${$event.year}/${$event.month+1}/${$event.day}`);
    }
  }
}
