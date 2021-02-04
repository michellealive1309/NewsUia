import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireFunctionsModule, FUNCTIONS_ORIGIN } from '@angular/fire/functions';
import { UserService } from './services/user.service';
import { OfflineService } from './services/offline.service';
import { NotificationService } from './services/notification.service';
import { AuthGuard } from './guard/auth.guard';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { ServiceWorkerModule } from '@angular/service-worker';
import { Network } from '@ionic-native/network/ngx';
import { environment } from '../environments/environment';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { FCM } from '@ionic-native/fcm/ngx'
import { LoginGuard } from './guard/login.guard';
import { ContentService } from './services/content.service';
import { GroupService } from './services/group.service';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AsyncPipe, LocationStrategy, HashLocationStrategy } from '@angular/common';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot({
      name: '__uiadb',
      driverOrder: ['indexeddb']
    }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule.enablePersistence(),
    AngularFireMessagingModule,
    AngularFireFunctionsModule,
    AngularFireStorageModule,
    AppRoutingModule,
    ServiceWorkerModule.register('/main-sw.js', { enabled: environment.production, registrationStrategy: 'registerImmediately' })
  ],
  providers: [
    GooglePlus,
    StatusBar,
    SplashScreen,
    UserService,
    OfflineService,
    NotificationService,
    AsyncPipe,
    ContentService,
    GroupService,
    FCM,
    AuthGuard,
    LoginGuard,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    Network,
    AndroidPermissions
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
