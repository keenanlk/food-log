import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LogdetailPage } from './logdetail.page';

const routes: Routes = [
  {
    path: '',
    component: LogdetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LogdetailPageRoutingModule {}
