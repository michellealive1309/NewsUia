import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UserService } from '../services/user.service';
import { GroupService } from '../services/group.service';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { OfflineService } from '../services/offline.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit, OnDestroy {

  subscribedGroup: Observable<any[]>
  userProfile: Observable<any>
  removeNotification$: any
  deleteToken$: any

  constructor( private userService: UserService,
    private notificationService: NotificationService,
    private groupService: GroupService,
    private navController: NavController ) {
      this.userProfile = this.userService.getUserProfile()
      this.subscribedGroup = this.userService.getUserProfile().pipe(switchMap(profile => this.groupService.getUserSubscribedGroup(profile.group)))
    }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.removeNotification$.unsubscribe()
    this.deleteToken$.unsubscribe()
  }

  public goToGroupPage(group) {
    // let groupData = group
    // let url = '/tabs/group/' + groupData.id
    this.navController.navigateForward("/tabs/group/" + group.id, { state: { group: group } })
  }

  public async logOut() {
    this.removeNotification$ = await this.userService.getUserProfile().pipe(switchMap(data => {
      return this.notificationService.getToken().pipe(switchMap(token => this.notificationService.removeNotifications(data.group, data.uid, token)))
    })).subscribe(result => {
      console.log(result)
    }, error => {console.log(error)})
    this.deleteToken$ = await this.notificationService.deleteToken()
    setTimeout(() => {this.userService.signOut()},2000)
  }

}
