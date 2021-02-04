import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { NewscontentComponent } from '../components/newscontent/newscontent.component';
import { AnnoucecontentComponent } from '../components/annoucecontent/annoucecontent.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage
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
export class HomePageRoutingModule {}
