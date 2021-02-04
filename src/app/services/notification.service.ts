import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions'
import { AngularFireMessaging } from '@angular/fire/messaging'
import { mergeMap } from 'rxjs/operators';
import { Platform } from '@ionic/angular'
import { FCM } from '@ionic-native/fcm/ngx';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  token: string
  currentMessage = new BehaviorSubject(null)

  constructor(private afFunc: AngularFireFunctions,
    private afMessaging: AngularFireMessaging,
    private fcm: FCM,
    private platform: Platform) {

  }

  requestPermission() {
    return this.afMessaging.requestToken.subscribe((token) => {
      console.log(token)
      this.token = token
    }, (err) => {
        console.error('Unable to get permission to notify.', err)
      }
    )
  }

  requestPermissionObservable() {
    return this.afMessaging.requestToken
  }

  getToken() {
    return this.afMessaging.getToken
  }

  deleteToken() {
    return this.afMessaging.getToken.pipe(mergeMap(token => this.afMessaging.deleteToken(token))).subscribe(token => {
      console.log('Delete token')
    }, error => {console.log(error)})
  }

  startNotifications(groups, uid, token) {
    let fcmToken = token
    console.log(fcmToken)
    const functions = this.afFunc.httpsCallable<{ uid: string, group: string[], token: string }, any>('registerDeviceToNotificationGroup')
    let callable = functions({ uid: uid, group: groups, token: fcmToken })
    return callable
  }

  removeNotifications(groups, uid, token) {
    let fcmToken = token
    console.log(fcmToken)
    const functions = this.afFunc.httpsCallable<{ uid: string, group: string[], token: string }, any>('removeDeviceToNotificationGroup')
    let callable = functions({ uid: uid, group: groups, token: fcmToken })
    return callable
  }

}
