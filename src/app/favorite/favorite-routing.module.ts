import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FavoritePage } from './favorite.page';
import { NewscontentComponent } from '../components/newscontent/newscontent.component';
import { AnnoucecontentComponent } from '../components/annoucecontent/annoucecontent.component';

const routes: Routes = [
  {
    path: '',
    component: FavoritePage
  },
  {
    path: 'news/:id',
    component: NewscontentComponent
  },
  {
    path: 'annouce/:id',
    component: AnnoucecontentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavoritePageRoutingModule {}
