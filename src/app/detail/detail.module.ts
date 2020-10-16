import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryDetailComponent } from './country-detail/country-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: CountryDetailComponent
  }
];

@NgModule({
  declarations: [CountryDetailComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    FontAwesomeModule
  ]
})
export class DetailModule { }
