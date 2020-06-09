import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';


export interface DataTableItem {
  date: string;
  consumption: string;
  energy: string;
  runTime: string;
  stopped: string;
  maxOutput: string;
  production: string;
  income: string;
}

const EXAMPLE_DATA: (DataTableItem)[] = [
  { date: "2020.06.01", consumption: "3.2 kWh", energy: "38.0 kVArh", runTime: "9", stopped: "-", maxOutput: "483.5 kW", production: "2190 kWh", income: "96 994.71 Ft"  },
  { date: "2020.06.02", consumption: "5.2 kWh", energy: "47.1 kVArh", runTime: "10", stopped: "-", maxOutput: "497.1 kW", production: "1940 kWh", income: "84 247.26 Ft"  },
  { date: "2020.06.03", consumption: "5.1 kWh", energy: "36.0 kVArh", runTime: "12", stopped: "-", maxOutput: "453.3 kW", production: "2749 kWh", income: "65 828.22 Ft"  },
  { date: "2020.06.04", consumption: "5.7 kWh", energy: "21.9 kVArh", runTime: "15", stopped: "-", maxOutput: "447.9 kW", production: "1871 kWh", income: "92 090.81 Ft"  },
  { date: "2020.06.05", consumption: "6.5 kWh", energy: "31.1 kVArh", runTime: "20", stopped: "-", maxOutput: "448.4 kW", production: "2363 kWh", income: "51 570.10 Ft"  },
  { date: "2020.06.06", consumption: "10.4 kWh", energy: "46.6 kVArh", runTime:" 17", stopped: "-", maxOutput: "468.8 kW", production: "2798 kWh", income: "96 646.93 Ft"  },
  { date: "2020.06.07", consumption: "7.4 kWh", energy: "31.2 kVArh", runTime: "14", stopped: "-", maxOutput: "408.6 kW", production: "1949 kWh", income: "77 678.70 Ft"  },
  { date: "2020.06.08", consumption: "11.4 kWh", energy: "31.4 kVArh", runTime:" 9", stopped: "-", maxOutput: "495.0 kW", production: "2920 kWh", income: "45 697.89 Ft"  },
  { date: "2020.06.09", consumption: "6.7 kWh", energy: "26.5 kVArh", runTime: "14", stopped: "-", maxOutput: "420.7 kW", production: "2812 kWh", income: "56 033.31 Ft"  },
  { date: "2020.06.10", consumption: "6.6 kWh", energy: "26.9 kVArh", runTime: "20", stopped: "-", maxOutput: "414.7 kW", production: "1377 kWh", income: "95 888.28 Ft"  },
  { date: "2020.06.11", consumption: "2.1 kWh", energy: "38.1 kVArh", runTime: "12", stopped: "-", maxOutput: "473.8 kW", production: "2925 kWh", income: "79 343.31 Ft"  },
  { date: "2020.06.12", consumption: "6.7 kWh", energy: "22.8 kVArh", runTime: "7", stopped: "-", maxOutput: "473.7 kW", production: "2392 kWh", income: "83 014.47 Ft"  },
  { date: "2020.06.13", consumption: "10.7 kWh", energy: "39.9 kVArh", runTime:" 15", stopped: "-", maxOutput: "438.4 kW", production: "1387 kWh", income: "46 812.51 Ft"  },
  { date: "2020.06.14", consumption: "8.5 kWh", energy: "38.8 kVArh", runTime: "15", stopped: "-", maxOutput: "413.7 kW", production: "1435 kWh", income: "48 223.40 Ft"  },
  { date: "2020.06.15", consumption: "4.2 kWh", energy: "31.5 kVArh", runTime: "6", stopped: "-", maxOutput: "436.8 kW", production: "1869 kWh", income: "90 963.47 Ft"  },
  { date: "2020.06.16", consumption: "11.4 kWh", energy: "22.7 kVArh", runTime:" 8", stopped: "-", maxOutput: "484.9 kW", production: "2927 kWh", income: "69 227.68 Ft"  },
  { date: "2020.06.17", consumption: "11.3 kWh", energy: "34.9 kVArh", runTime:" 18", stopped: "-", maxOutput: "487.0 kW", production: "1729 kWh", income: "61 751.88 Ft"  },
  { date: "2020.06.18", consumption: "11.6 kWh", energy: "21.9 kVArh", runTime:" 5", stopped: "-", maxOutput: "420.5 kW", production: "1468 kWh", income: "96 487.90 Ft"  },
  { date: "2020.06.19", consumption: "5.3 kWh", energy: "20.3 kVArh", runTime: "10", stopped: "-", maxOutput: "480.8 kW", production: "2890 kWh", income: "48 915.79 Ft"  },
  { date: "2020.06.20", consumption: "9.1 kWh", energy: "48.6 kVArh", runTime: "14", stopped: "-", maxOutput: "477.9 kW", production: "1620 kWh", income: "87 555.59 Ft"  },
  { date: "2020.06.21", consumption: "9.4 kWh", energy: "39.6 kVArh", runTime: "11", stopped: "-", maxOutput: "441.4 kW", production: "1907 kWh", income: "80 257.93 Ft"  },
  { date: "2020.06.22", consumption: "6.2 kWh", energy: "26.1 kVArh", runTime: "6", stopped: "-", maxOutput: "430.4 kW", production: "1669 kWh", income: "46 368.12 Ft"  },
  { date: "2020.06.23", consumption: "8.3 kWh", energy: "46.8 kVArh", runTime: "7", stopped: "-", maxOutput: "433.3 kW", production: "2504 kWh", income: "83 031.80 Ft"  },
  { date: "2020.06.24", consumption: "11.6 kWh", energy: "24.2 kVArh", runTime:" 5", stopped: "-", maxOutput: "432.1 kW", production: "1760 kWh", income: "91 243.60 Ft"  },
  { date: "2020.06.25", consumption: "11.8 kWh", energy: "30.6 kVArh", runTime:" 8", stopped: "-", maxOutput: "421.3 kW", production: "1803 kWh", income: "98 048.10 Ft"  },
  { date: "2020.06.26", consumption: "8.8 kWh", energy: "42.0 kVArh", runTime: "19", stopped: "-", maxOutput: "421.2 kW", production: "2221 kWh", income: "81 353.59 Ft"  },
  { date: "2020.06.27", consumption: "6.0 kWh", energy: "32.8 kVArh", runTime: "8", stopped: "-", maxOutput: "405.8 kW", production: "2207 kWh", income: "89 085.52 Ft"  },
  { date: "2020.06.28", consumption: "5.9 kWh", energy: "26.3 kVArh", runTime: "8", stopped: "-", maxOutput: "423.5 kW", production: "1679 kWh", income: "52 261.08 Ft"  },
  { date: "2020.06.29", consumption: "2.6 kWh", energy: "33.8 kVArh", runTime: "6", stopped: "-", maxOutput: "414.9 kW", production: "1972 kWh", income: "69 153.41 Ft"  },
  { date: "2020.06.30", consumption: "2.9 kWh", energy: "28.6 kVArh", runTime: "20", stopped: "-", maxOutput: "461.5 kW", production: "2060 kWh", income: "98 099.63 Ft"  },
  { date: "2020.07.01", consumption: "3.3 kWh", energy: "23.9 kVArh", runTime: "20", stopped: "-", maxOutput: "428.1 kW", production: "2820 kWh", income: "69 674.05 Ft"  },
  { date: "2020.07.02", consumption: "3.5 kWh", energy: "20.1 kVArh", runTime: "5", stopped: "-", maxOutput: "411.4 kW", production: "1381 kWh", income: "94 772.45 Ft"  },
  { date: "2020.07.03", consumption: "3.0 kWh", energy: "24.6 kVArh", runTime: "19", stopped: "-", maxOutput: "451.0 kW", production: "1255 kWh", income: "61 319.39 Ft"  },
  { date: "2020.07.04", consumption: "3.4 kWh", energy: "37.0 kVArh", runTime: "10", stopped: "-", maxOutput: "412.1 kW", production: "2098 kWh", income: "62 548.22 Ft"  }
];

export class DataTableDataSource extends DataSource<DataTableItem> {
  data: any[] = EXAMPLE_DATA;
  paginator: MatPaginator;
  sort: MatSort;

  constructor() {
    super();
  }

  connect(): Observable<DataTableItem[]> {
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  disconnect() {}

  disableGroup(){}

   getPagedData(data: DataTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  
   getSortedData(data: DataTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'energy': return compare(a.energy, b.energy, isAsc);
        case 'consumption': return compare(+a.consumption, +b.consumption, isAsc);
        default: return 0;
      }
    });
  }
}

function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
