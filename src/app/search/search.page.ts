import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertController } from '@ionic/angular'
import { UserService } from '../services/user.service';
import { NotificationService } from '../services/notification.service';
import { GroupService } from '../services/group.service';
import { Group } from '../interfaces/group';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { OfflineService, ConnectionStatus } from '../services/offline.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit, OnDestroy {

  searchResult: Observable<Group[]>
  emptyResult: Observable<Group[]>
  isConnect: boolean = false
  subscribeNotification$: any

  constructor(private groupService: GroupService,
    private userService: UserService,
    private offlineService: OfflineService,
    private noticeService: NotificationService,
    private alertController: AlertController) { }

  ngOnInit() {
    this.offlineService.onNetworkChange().subscribe(connection => { //Unused function
      connection == ConnectionStatus.Offline ? true : false
    })
  }

  ngOnDestroy(): void {
    if (this.subscribeNotification$) {
      this.subscribeNotification$.unsubscribe()
    }
  }

  onSearchChange(event: Event) {
    const searchValue = (<HTMLIonSearchbarElement>event.target).value.trim().replace(new RegExp(' ', 'gi'), '').toLowerCase()
    this.searchResult = this.emptyResult
    if (!searchValue || searchValue.length < 2) {
      return this.searchResult
    }
    this.searchResult = this.groupService.searchGroup(searchValue).pipe(map(groups => groups.map(group => {
      if(!group.subscriber) { group.subscriber = [] }
      return group
    })))
  }

  subscribeGroup(group) {
    console.log(group)
    if (group.privacy === "private") {
      const alert = this.alertController.create({
        header: "Private group",
        message: "Password required",
        inputs: [
          {
            type: 'text',
            name: 'password',
            placeholder: "Enter a password..."
          }
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel'
          },
          {
            text: 'Confirm',
            handler: (alertInput) => {
              let userId = this.userService.userInfo.uid
              if (alertInput.password === group.password) {
                this.userService.addGroupToUser(group.id)
                this.groupService.addUserToGroup(group.id, userId)
                this.subscribeNotification(group.id)
              }
            }
          }
        ]
      })
      alert.then(alertable => alertable.present())
    }
    else {
      let userId = this.userService.userInfo.uid
      this.userService.addGroupToUser(group.id)
      this.groupService.addUserToGroup(group.id, userId)
      this.subscribeNotification(group.id)
    }
  }

  subscribeNotification(groupId) {
    let group = [groupId]
    this.subscribeNotification$ = this.userService.getUserProfile().pipe(switchMap(data => {
      console.log(data)
      return this.noticeService.getToken().pipe(switchMap(token => this.noticeService.startNotifications(group, data.uid, token)))
    })).subscribe(result => {
      console.log(result)
    }, error => {console.log(error)})
  }

}
