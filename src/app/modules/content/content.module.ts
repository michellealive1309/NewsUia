import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnnoucefeedComponent } from 'src/app/components/annoucefeed/annoucefeed.component';
import { IonicModule } from '@ionic/angular';
import { NewscontentComponent } from 'src/app/components/newscontent/newscontent.component';
import { AnnoucecontentComponent } from 'src/app/components/annoucecontent/annoucecontent.component';
import { DateFormatPipe } from '../../pipes/date-format.pipe';
import { GroupNamePipe } from '../../pipes/group-name.pipe';
import { NameGetterPipe } from '../../pipes/name-getter.pipe';
import { FileNamePipe } from '../../pipes/file-name.pipe';
import { SaveContentPipe } from '../../pipes/save-content.pipe';
import { NewsfeedComponent } from 'src/app/components/newsfeed/newsfeed.component';
import { SubscribeGroupPipe } from 'src/app/pipes/subscribe-group.pipe';



@NgModule({
  declarations: [
    AnnoucefeedComponent,
    NewsfeedComponent,
    NewscontentComponent,
    AnnoucecontentComponent,
    DateFormatPipe, GroupNamePipe, NameGetterPipe, FileNamePipe, SaveContentPipe, SubscribeGroupPipe
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [AnnoucefeedComponent,
    NewsfeedComponent,
    NewscontentComponent,
    AnnoucecontentComponent,
    DateFormatPipe,
    GroupNamePipe,
    NameGetterPipe,
    FileNamePipe,
    SaveContentPipe,
    SubscribeGroupPipe
  ]
})
export class ContentModule { }
