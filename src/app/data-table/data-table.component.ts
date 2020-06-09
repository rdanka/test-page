import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { DataTableDataSource, DataTableItem } from './data-table-datasource';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})


export class DataTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<DataTableItem>;
  dataSource: DataTableDataSource;
  dataTable: DataTableDataSource;

  displayedColumns = ['Időszak', 'Fogyasztás', 'Meddő-energia', 'Üzemóra', 'Üzemszünet', 'Max-teljesítmény', 'Termelés', 'Bevétel'];

  public period: string;

  ngOnInit() {
    this.dataSource = new DataTableDataSource();
  }
   refreshTable() {
     /*if (this.period === '_2') {
      this.dataSource.data.forEach(row => {
        row.date = row.date.substring(5, 7);
       });
     }else if (this.period === '_3') {
      this.dataSource.data.forEach(row => {
        row.date = row.date.substring(0, 4);
       });
     }*/
    this.table.renderRows();

    console.log(this.dataTable);
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  getPeriod($event){
    this.period = $event.id;
    this.table.renderRows();
    this.refreshTable();
  }

  getmonth(month){
    const monthNames = [ "Január", "Február", "Március", "Április", "Május", "Június", "Július", "Augusztus", "Szeptember", "Október", "November", "December" ];
    return monthNames[month-1];
  }
  downloadTable(){  
    alert("Letöltve!");
  }
}

