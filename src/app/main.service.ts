import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class MainService {

  stocks: Array<String>;


  constructor(private _http: Http) { }

  getPrice(stock, cb) {
    this.stocks = stock.symbol.split(',');
    for (var i = 0; i<this.stocks.length; i++){
      var stockSymbol  = this.stocks[i].trim();
      // this._http.get('https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol='+stock.symbol+'&interval=1min&apikey=GT13K1EANRVG5KOS').subscribe((res) =>
      this._http.get('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol='+stockSymbol+'&apikey=GT13K1EANRVG5KOS').subscribe((res) => {
        // this.prices.push(res.json()["Time Series (1min)"][Object.keys(res.json()["Time Series (1min)"])[0]]["1. open"]);
        // console.log(this.prices);
        cb(res.json()["Meta Data"]["2. Symbol"], res.json()["Time Series (Daily)"][Object.keys(res.json()["Time Series (Daily)"])[0]]["1. open"], res.json()["Time Series (Daily)"][Object.keys(res.json()["Time Series (Daily)"])[1]]["4. close"], res.json()["Time Series (Daily)"][Object.keys(res.json()["Time Series (Daily)"])[0]]["6. volume"], res.json()["Time Series (Daily)"][Object.keys(res.json()["Time Series (Daily)"])[0]]["7. dividend amount"], res.json()["Time Series (Daily)"][Object.keys(res.json()["Time Series (Daily)"])[0]]["4. close"]);
      })
    }
  };

  // showPrice(cb) {
  //   console.log("show in service", this.prices);
  //     cb(this.prices);
  // };

}
