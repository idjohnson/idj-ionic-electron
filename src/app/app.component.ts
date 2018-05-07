import { Component, ViewChild } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ElectronService } from 'ngx-electron';

import { HomePage } from '../pages/home/home';
import { AddressServiceProvider } from './core/address-service/address-service';
import { Address } from './core/address';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('content') nav: NavController;
  rootPage: any = HomePage;

  constructor(
    private addressService: AddressServiceProvider,
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private electron: ElectronService) {
    
    platform
      .ready()
      .then(() => this.onReady())
  }

  onReady() {
    // Okay, so the platform is ready and our plugins are available.
    // Here you can do any higher level native things you might need.
    // StatusBar.styleDefault();
    // Splashscreen.hide();

    this.setupIpc();
  }

  setupIpc() {
    if (this.electron.isElectronApp) {
      console.log('Electron shell detected.');
      this.electron.ipcRenderer.on('onMap', () => this.nav.setRoot(HomePage));
      this.electron.ipcRenderer.on('onLocations', () => this.nav.setRoot('AddressListPage'));
      this.electron.ipcRenderer.on('onProvision', async (evt, address: Address) => {
        await this.addressService.provision(address)
        this.nav.setRoot(HomePage, { address })
      });
    }
  }
}
