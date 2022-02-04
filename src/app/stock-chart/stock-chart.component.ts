import { Component, OnInit, Input } from '@angular/core';
// import { setInterval } from 'timers';
import { HttpService } from '../http.service';
@Component({
  selector: 'app-stock-chart',
  templateUrl: './stock-chart.component.html',
  styleUrls: ['./stock-chart.component.css'],
})
export class StockChartComponent implements OnInit {
  @Input() stockName;
  data;
  setIntervalId: any;
  type = 'CandlestickChart';
  options = {
    legend: 'none',
    candlestick: {
      fallingColor: { strokeWidth: 1, stroke: '#a52714' }, // red
      risingColor: { strokeWidth: 1, stroke: '#0f9d58' }, // green
    },
  };
  columnNames = ['Date', 'A', 'B', 'C', 'D'];
  width = 1400;
  height = 700;

  constructor(private httpService: HttpService) {}

  getData() {
    this.updateData();
    this.setIntervalId = setInterval(() => {
      this.updateData();
    }, 5000);
  }

  updateData() {
    this.httpService.getSingleStockFor(this.stockName).subscribe((data) => {
      // this.data = data;
      let tempData = [];
      try {
        let objKeys = Object.keys(data['Time Series (1min)']);
        for (let i = 99; i > 0; i--) {
          let minuteData = data['Time Series (1min)'][objKeys[i]];
          let colName = objKeys[i];
          let open = parseFloat(minuteData['1. open']);
          let high = parseFloat(minuteData['2. high']);
          let low = parseFloat(minuteData['3. low']);
          let close = parseFloat(minuteData['4. close']);
          let volume = parseFloat(minuteData['5. volume']);
          let tempSingleData = [];
          tempSingleData.push(colName, low, open, close, high);
          tempData.push(tempSingleData);
        }
        console.log(tempData);
        console.log(this.data);
        this.data = tempData;
      }
      catch(err)
      {
        console.log("server side error");
      }
      
    });
  }

  updateDayData()
  {
    this.httpService.getDayStocks(this.stockName).subscribe((data) => {
      // this.data = data;
      let tempData = [];
      try {
        let objKeys = Object.keys(data['Time Series (60min)']);
        for (let i = 99; i > 0; i--) {
          let minuteData = data['Time Series (60min)'][objKeys[i]];
          let colName = objKeys[i];
          let open = parseFloat(minuteData['1. open']);
          let high = parseFloat(minuteData['2. high']);
          let low = parseFloat(minuteData['3. low']);
          let close = parseFloat(minuteData['4. close']);
          let volume = parseFloat(minuteData['5. volume']);
          let tempSingleData = [];
          tempSingleData.push(colName, low, open, close, high);
          tempData.push(tempSingleData);
        }
        console.log(tempData);
        console.log(this.data);
        this.data = tempData;
      }
      catch(err)
      {
        console.log("server side error");
      }
      
    });
  }


  stopData() {
    clearInterval(this.setIntervalId);
  }

  ngOnInit(): void {
    var now = new Date();
    var currentDay = now.getDay();
    var currentHours = now.getHours();
    if(currentDay >=1 && currentDay <= 5)
    {
      if(currentHours > 9 && currentHours < 16)
      { // stock market is ON
        console.log("stock market is ON");
        this.getData();
      }
      else {
        console.log("weekday but non stock time");
        this.updateDayData();
      }
    }
    else {
      console.log("weekend, so no stock market");
      this.updateDayData();
    }
  }
}
