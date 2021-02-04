import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

  // subscribeNotification$: any
  userProfile: Observable<any>
  message: any

  constructor(  private userService: UserService,
    private noticeService: NotificationService ) {
      this.userProfile = this.userService.getUserProfile()
      // this.startNotification()
  }

  ngOnInit() {
    
  }

  ngOnDestroy() {
    // this.subscribeNotification$.unsubscribe()
  }

  // startNotification() {
  //   this.subscribeNotification$ = this.userService.getUserProfile().pipe(switchMap(data => {
  //     console.log(data)
  //     return this.noticeService.getToken().pipe(switchMap(token => this.noticeService.startNotifications(data.group, data.uid, token)))
  //   })).subscribe(result => {
  //     console.log(result)
  //   }, error => {console.log(error)})
  // }

}