import { Component, OnDestroy, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { AngularFireMessaging } from '@angular/fire/messaging'
import { NotificationService } from '../services/notification.service';
import { UserService } from '../services/user.service';
import { switchMap } from 'rxjs/operators'

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit, OnDestroy {

  position: string = ""
  message: any
  isShow: boolean = false
  requestPermission$: any
  subscribeMessage$: any
  subscribeNotification$: any

  constructor(private platform: Platform,
    private noticeService: NotificationService,
    private userService: UserService,
    private afMessaging: AngularFireMessaging) {
    if (this.platform.is('android')) {
      this.position = "bottom"
    }
    else {
      this.position = "top"
    }
    this.requestPermission$ = this.noticeService.requestPermission()
    this.subscribeMessage$ = this.afMessaging.messages.subscribe((message: any) => {
      console.log(message)
      this.isShow = false
      this.message = message
      this.activateCustomToast()
    })
  }

  ngOnInit() {
    this.startNotification()
  }

  ngOnDestroy(): void {
    this.requestPermission$.unsubscribe()
    this.subscribeMessage$.unsubscribe()
    this.subscribeNotification$.unsubscribe()
    this.userService.userInfo$.unsubscribe()
    this.userService.userProfile$.unsubscribe()
  }

  startNotification() {
    this.subscribeNotification$ = this.userService.getUserProfile().pipe(switchMap(data => {
      console.log(data)
      return this.noticeService.getToken().pipe(switchMap(token => this.noticeService.startNotifications(data.group, data.uid, token)))
    })).subscribe(result => {
      console.log(result)
    }, error => {console.log(error)})
  }

  activateCustomToast() {
    this.isShow = true
    setTimeout(() => {
      this.isShow = false
    }, 3000)
  }

}
