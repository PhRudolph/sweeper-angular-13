import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FieldComponent } from './field/field.component';
import { TutorialComponent } from './tutorial/tutorial.component';

const routes: Routes = [
  { path: '', component: FieldComponent },
  { path: 'documentation', component: TutorialComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
