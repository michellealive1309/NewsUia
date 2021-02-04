import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { GroupService } from '../../services/group.service';
import { ContentService } from '../../services/content.service';
import { NotificationService } from '../../services/notification.service';
import { IonicModule } from '@ionic/angular';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { DateFormatPipe } from '../../pipes/date-format.pipe';
import { GroupComponent } from '../../components/group/group.component';
import { ContentModule } from '../content/content.module';



@NgModule({
  declarations: [GroupComponent],
  exports: [],
  imports: [
    CommonModule,
    IonicModule,
    ContentModule,
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [
    UserService,
    GroupService,
    ContentService,
    NotificationService
  ]
})
export class GroupModule { }
