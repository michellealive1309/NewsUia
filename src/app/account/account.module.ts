import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountPageRoutingModule } from './account-routing.module';
import { AccountPage } from './account.page';
import { UserService } from '../services/user.service'
import { GroupService } from '../services/group.service'
import { ContentService } from '../services/content.service'
import { NotificationService } from '../services/notification.service'
import { GroupModule } from '../modules/group/group.module';
import { ContentModule } from '../modules/content/content.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GroupModule,
    AccountPageRoutingModule
  ],
  providers: [
    UserService,
    GroupService,
    ContentService,
    NotificationService
  ],
  declarations: [AccountPage]
})
export class AccountPageModule {}
