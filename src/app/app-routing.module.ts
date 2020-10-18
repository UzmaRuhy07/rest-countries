import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './errors/not-found/not-found.component';

const routes: Routes = [

  {
    path: 'countries',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path:'',
    redirectTo: 'countries',
    pathMatch:'full'
  },
  {
    path: 'detail/:code',
    loadChildren: () => import('./detail/detail.module').then(m => m.DetailModule)
  },
  {path: '**', component: NotFoundComponent} // wild-card route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
