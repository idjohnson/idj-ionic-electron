import { Component } from '@angular/core';
import { NavController, FabContainer } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

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
