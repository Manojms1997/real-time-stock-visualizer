import { Component } from '@angular/core';
import { HttpService } from './http.service';
import { HttpClient } from '@angular/common/http';
import { interval } from 'rxjs';
import { min, takeWhile } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  setIntervalId: any;
  stocksList = ['AAPL', 'IBM', 'MSFT', 'GOOGL'];
  selectedItem;

  selectedStocks;
  constructor(private httpService: HttpService, private http: HttpClient) {
  }

  // getData() {
  //   this.setIntervalId = setInterval(() => {
  //     this.httpService.getStocks('AAPL').subscribe((data: any) => {
  //       console.log(data['Time Series (1min)']);
  //     });
  //     // console.log(this.httpService.getStocks("AAPL"));
  //   }, 5000);
  // }

  genGraphs()
  {
    this.selectedStocks = this.selectedItem;
  }

}
