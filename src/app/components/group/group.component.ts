import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { GroupService } from 'src/app/services/group.service';
import { UserService } from 'src/app/services/user.service';
import { NotificationService } from 'src/app/services/notification.service';
import { switchMap } from 'rxjs/operators';
import { OfflineService } from 'src/app/services/offline.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
})
export class GroupComponent implements OnInit, OnDestroy {

  groupData: any
  groupId: string[]
  removeNotification$: any

  constructor(private router: Router,
    private alertController: AlertController,
    private navController: NavController,
    private userService: UserService,
    private notificationService: NotificationService,
    private groupService: GroupService) {
    let navState = this.router.getCurrentNavigation().extras.state.group
    this.groupData = navState
    this.groupId = [navState.id]
  }

  ngOnInit() {}
  
  ngOnDestroy(): void {
    console.log(this.removeNotification$)
    if (this.removeNotification$) {
      this.removeNotification$.unsubscribe()
    }
  }

  async unsubscribeGroup() {

    const alert = await this.alertController.create({
      header: 'Unsubscribe this group',
      message: 'Please confirm to unsubscribe this group.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Confirm',
          handler: () => {
            this.proceedUnsubscribe()
          }
        }
      ]
    })
    alert.present()
  }

  private proceedUnsubscribe() {
    let userId = this.userService.userInfo.uid
    this.userService.removeGroupFromUser(this.groupData.id)
    this.userService.deleteSavedContentFromUnsubscribeGroup(this.groupData.id)
    this.groupService.removeUserFromGroup(this.groupData.id, userId)
    this.unsubscribeNotification(this.groupData.id)
    this.dismissGroup()
  }

  unsubscribeNotification(groupId) {
    let group = [groupId]
    this.removeNotification$ = this.userService.getUserProfile().pipe(switchMap(data => {
      return this.notificationService.getToken().pipe(switchMap(token => this.notificationService.removeNotifications(group, data.uid, token)))
    })).subscribe(result => {
      console.log(result)
    }, error => {console.log(error)})
  }

  public dismissGroup() {
    this.navController.back()
  }

}
