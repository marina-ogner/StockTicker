import { Component } from '@angular/core';
import { MainService } from './main.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  stock: object;
  stocks: {name: string, price: number, priceCompare: string, priceYesterday: number, volume: number, divident: number, closePrice: number}[];
  // price: Array<any> = [];
  constructor(private _mainService: MainService) {
    this.stock = { symbol: '' };
  }

  getPrice() {
    this.stocks = [];
    this._mainService.getPrice(this.stock, (Name, Price, PriceYesterday, Volume, Divident, ClosePrice) => {
      var retrievedStock = {name: Name, price: Price, priceCompare: (Price-PriceYesterday).toFixed(2), priceYesterday: PriceYesterday, volume: Volume, divident: Divident, closePrice: ClosePrice};
      this.stocks.push(retrievedStock);
      this.stock = { symbol: '' };
      // console.log("in comp", this.prices);
    });
  }
  // showPrice(i) {
  //   this._mainService.showPrice((data) => {
  //     this.prices.push(data[i]);
  //     console.log("in comp",this.prices);
  //   })
  // };


}
