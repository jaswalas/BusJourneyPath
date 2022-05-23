import { Component, ViewChild } from '@angular/core';
import { CustomerService } from './customerservice';
import { Dropdown } from 'primeng/dropdown/dropdown';

interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  tripArray = [];
  minTrip = 0;
  _totalTripLength = 0;

  constructor(private customerService: CustomerService) {}

  getMiniDistanceBtwTwoStations(distanceArray: []) {
    return Math.min.apply(
      null,
      distanceArray.map((x: string | any[]) => x.length)
    );
  }

  getTotalLengthOfTrip(distanceArray: []) {
    return distanceArray
      .map((item: string | any[]) => item.length)
      .reduce((prev, curr) => prev + curr, 0);
  }

  ngOnInit() {
    this.customerService.getCustomersLarge().then((customers: any) => {
      console.log(customers[0].links);

      const _arr = customers[0].links.map(
        ({ length, end }: { length: number; end: Object }) => ({
          length,
          end,
        })
      );

      _arr.unshift({
        length: 0,
        end: customers[0].links[0].start,
      });
      console.log(_arr);

      this.tripArray = _arr; //customers[0].links;
      const dis = this.getMiniDistanceBtwTwoStations(customers[0].links);
      this.minTrip = dis;
      console.log(dis);

      const totalTripLength = this.getTotalLengthOfTrip(customers[0].links);
      console.log(totalTripLength);
      this._totalTripLength = totalTripLength;
    });
  }

  ngAfterViewInit() {}
}
