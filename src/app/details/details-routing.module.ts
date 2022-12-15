import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArchivedDetailsComponent } from './archived-details/archived-details.component';

import { DetailsPage } from './details.page';

const routes: Routes = [
  {
    path: ':id',
    component: DetailsPage
  },
  {
    path: 'archived/:id',
    component: ArchivedDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailsPageRoutingModule {}
