import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewcomerPage } from './newcomer.page';

const routes: Routes = [
  {
    path: '',
    component: NewcomerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewcomerPageRoutingModule {}
