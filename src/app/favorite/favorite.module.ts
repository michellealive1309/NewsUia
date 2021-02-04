import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { FavoritePageRoutingModule } from './favorite-routing.module';
import { FavoritePage } from './favorite.page';
import { UserService } from '../services/user.service';
import { ContentService } from '../services/content.service';
import { NewsfeedComponent } from '../components/newsfeed/newsfeed.component'
import { ContentModule } from '../modules/content/content.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavoritePageRoutingModule,
    ContentModule,
  ],
  providers: [
    UserService,
    ContentService
  ],
  declarations: [FavoritePage]
})
export class FavoritePageModule {}
