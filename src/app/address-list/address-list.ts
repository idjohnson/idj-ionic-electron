import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Address } from '../core/address';
import { AddressServiceProvider } from '../core/address-service/address-service';
import { HomePage } from '../../pages/home/home';

/**
 * Generated class for the AddressListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-address-list',
  templateUrl: 'address-list.html',
})
export class AddressListPage {
  public addresses: Promise<Address[]>;

  constructor(public navCtrl: NavController, private addressService: AddressServiceProvider) {
  }

  ionViewDidLoad() {
    this.addresses = this.addressService.fetchAll();
  }

  selectLocation(address: Address) {
    this.navCtrl.setRoot(HomePage, { address });
  }
}
