import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SpashPage } from './spash.page';

const routes: Routes = [
  {
    path: '',
    component: SpashPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpashPageRoutingModule {}
