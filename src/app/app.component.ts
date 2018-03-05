import { Component } from '@angular/core';
import { MainService } from './main.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  stock: object;
  errors: string[];
  stocks: { name: string, currentPrice: number, priceCompare: string, priceYesterday: number, volume: number, divident: number, closePrice: number }[];

  currentPrice = Number;
  constructor(private _mainService: MainService) {
    this.stock = { symbol: '' };
  }

  getCurrentPrice() {
    this.errors = [];
    this._mainService.getCurrentPrice(this.stock, (stockSymbol, valid) => {
      if (valid === true) {
        this.getPrice(stockSymbol);
      }
      else {
        this.errors.push(stockSymbol)
      }
    })
  }

  getPrice(stockSymbol) {
    this.stocks = [];
    this._mainService.getPrice(stockSymbol, (Name, CurrentPrice, PriceYesterday, Volume, Divident, ClosePrice) => {
      var retrievedStock = { name: Name, currentPrice: CurrentPrice, priceCompare: (CurrentPrice - PriceYesterday).toFixed(2), priceYesterday: PriceYesterday, volume: Volume, divident: Divident, closePrice: ClosePrice };
      this.stocks.push(retrievedStock);
      this.stock = { symbol: '' };
    });
  }
}
