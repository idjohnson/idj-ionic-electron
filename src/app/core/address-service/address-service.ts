import { Injectable } from '@angular/core';
import { Address } from '../address';

@Injectable()
export class AddressServiceProvider {

  private addresses: Address[] = [];
  constructor() {
    console.log('Hello AddressServiceProvider Provider');

    this.addresses.push(new Address(1, 'YMCA', '2175 Radio Dr', '', 'Woodbury', 'MN', '55125', 'stopwatch'));
    this.addresses.push(new Address(2, 'ThomsonReuters', '610 Opperman Dr', '', 'Eagan', 'MN', '55123', 'hammer'));
    this.addresses.push(new Address(3, 'Home', '1310 Schooner Ct', '', 'Woodbury', 'MN', '55125', 'home'));
  }

  fetchAll() : Promise<Address[]>{
    var p = Promise.resolve<Address[]>(this.addresses);
    return p;
  }
}
