
import EventEmitter from 'events'

interface Prices {
    [key: string]: [number]
}

export default class PriceHolder {

    prices: Prices
    average: number

    constructor(average){
        this.average = average
        this.prices = {}
    }
  
    // Update the latest price for the given symbol
    putPrice (symbol: string, value: number): void {
        if(symbol in this.prices){
            this.prices[symbol].push(value)
        }else{
            Object.assign(this.prices, {[symbol]: [value]})
        }
    }
    // Get the latest price for the given symbol
    getPrice (symbol: string){
        return symbol in this.prices && this.prices[symbol].pop()
    }
  
    // Get a rolling average of historical prices for the given symbol
    getAverage (symbol: string){
        if(symbol in this.prices){
            const sum = this.prices[symbol].slice(-this.average).reduce((accum, i) => accum + i, 0)
            return sum / this.average
        }
    }
  
    // Wait until the next call to putPrice for the given symbol
    waitForNextPrice (symbol: string): Promise<unknown> {
        
        const countPrices = symbol in this.prices ? this.prices[symbol].length : 0;
        return new Promise(resolve => {
            const x = setInterval(() => {
              if(this.prices[symbol].length > countPrices) {
                clearInterval(x)
                resolve(this.getPrice(symbol));
              }
            }, 100);
          });

    }
  
    // Somehow allow a consumer to subscribe to (and unsubscribe from) price changes.
    subscribe (symbol: string): unknown {
      // Add code here. Don't forget to change the return type.

      const eventEmitter = new EventEmitter()
      return
    }
  }



  