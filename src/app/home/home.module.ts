import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';
import { ContentModule } from '../modules/content/content.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContentModule,
    HomePageRoutingModule,
  ],
  exports: [HomePage],
  entryComponents: [HomePage],
  declarations: [HomePage]
})
export class HomePageModule {}
