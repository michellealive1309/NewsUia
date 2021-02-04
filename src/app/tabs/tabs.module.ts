import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import { GroupModule } from '../modules/group/group.module';
import { ContentModule } from '../modules/content/content.module';
import { QuillModule } from 'ngx-quill'

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    QuillModule.forRoot(),
    FormsModule,
    ContentModule,
    GroupModule,
    TabsPageRoutingModule
  ],
  declarations: [TabsPage],
  // exports: [DateFormatPipe, GroupNamePipe, NameGetterPipe, FileNamePipe, SaveContentPipe]
})
export class TabsPageModule {}
