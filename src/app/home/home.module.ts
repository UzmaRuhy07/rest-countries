import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { CountryComponent } from './country/country.component';
import { RouterModule, Routes } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  }
];

@NgModule({
  declarations: [HomeComponent, CountryComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }
