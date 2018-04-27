import { Injectable } from '@angular/core';
import { Address } from '../address';

@Injectable()
export class AddressServiceProvider {

  private addresses: Address[] = [];
  constructor() {
    console.log('Hello AddressServiceProvider Provider');

    this.addresses.push(new Address(1, 'YMCA', '2175 Radio Dr', '', 'Woodbury', 'MN', '55125', 'stopwatch', '', '44.916907', '-92.932066'));
    this.addresses.push(new Address(2, 'ThomsonReuters', '610 Opperman Dr', '', 'Eagan', 'MN', '55123', 'hammer', '', '44.824317', '-93.112396'));
    this.addresses.push(new Address(3, 'Home', '1310 Schooner Ct', '', 'Woodbury', 'MN', '55125', 'home', '', '44.930511', '-92.911950'));
  }

  fetchAll() : Promise<Address[]>{
    var p = Promise.resolve<Address[]>(this.addresses);
    return p;
  }
}
