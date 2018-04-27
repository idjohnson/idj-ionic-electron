import { Component } from '@angular/core';
import { NavController, FabContainer, NavParams } from 'ionic-angular';
import { Address } from '../../app/core/address';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  address: Address;
  defaultMapInfo = {
    lat: 40.429761,
    lng: -111.8952174
  };
  located = false;

  constructor(public navCtrl: NavController, private navParams: NavParams) {
    this.address = navParams.data.address;
    if (this.address) {
      this.located = true;
    }

  }

  getLatitude(): number {
    return this.located ? Number(this.address.latitude) : this.defaultMapInfo.lat;
  }

  getLongitude(): number {
    return this.located ? Number(this.address.longitude) : this.defaultMapInfo.lng;
  }

  gotoSetup(fab: FabContainer) {
    fab.close();
    this.navCtrl.push('SetupPage', {}, { animate: true, direction: 'forward' });
  }

  gotoLocations(fab: FabContainer) {
    fab.close();
    this.navCtrl.setRoot('AddressListPage');
  }
}
