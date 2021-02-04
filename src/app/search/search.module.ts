import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SearchPageRoutingModule } from './search-routing.module';
import { SearchPage } from './search.page';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { GroupService } from '../services/group.service';
import { NotificationService } from '../services/notification.service';
import { ContentModule } from '../modules/content/content.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContentModule,
    SearchPageRoutingModule,
    AngularFirestoreModule.enablePersistence(),
    AngularFireFunctionsModule
  ],
  providers: [
    GroupService,
    NotificationService
  ],
  declarations: [SearchPage]
})
export class SearchPageModule {}
