import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  ApiKey = '0OSNQJOB1P55NHHK';
  posts: any;
  constructor(private http: HttpClient) {
    this.count = 0;
  }
  count: number;
  data: any;

  getSingleStock(): Observable<any>
  {
    var url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=1min&apikey='+this.ApiKey;
    return this.http.get(url);
  }


  getSingleStockFor(stockName: String): Observable<any>
  {
    var url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol='+stockName+'&interval=1min&apikey='+this.ApiKey;
    return this.http.get(url);
  }

  getDayStocks(stockName: String)
  {
    var url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol='+stockName+'&interval=60min&apikey='+this.ApiKey;
    return this.http.get(url);
  }

  getStocks(stockName: String) : Observable<any> {
    // var url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=1min&apikey='+this.ApiKey;
    // return this.http.get(url);

    if (this.count == 0) {
      this.count++;
      var url =
        'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol='+stockName+'&interval=1min&apikey=' +
        this.ApiKey;
      this.http.get(url).subscribe((data) => {
        this.data = data;
      });
      return this.http.get(url);
    }
    var response = of(this.data);
    this.count++;
    if (this.count == 12) {
      this.count = 0;
    }
    return response;
  }
}
