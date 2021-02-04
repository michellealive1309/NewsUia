import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import 'firebase/messaging';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private androidPermission: AndroidPermissions
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.androidRequestPermission()
    });
  }

  androidRequestPermission() {
    if (this.platform.is('android')) {
      this.androidPermission.requestPermissions([
        this.androidPermission.PERMISSION.CAMERA,
        this.androidPermission.PERMISSION.ACCESS_NETWORK_STATE,
        this.androidPermission.PERMISSION.ACCESS_WIFI_STATE,
        this.androidPermission.PERMISSION.READ_EXTERNAL_STORAGE,
        this.androidPermission.PERMISSION.WRITE_EXTERNAL_STORAGE
      ])
    }
  }

}
