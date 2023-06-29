import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TableComponent } from 'src/trips/components/table/table.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    loadChildren: () =>
      import('src/authentication/authentication.module').then((m) => m.AuthenticationModule),
    path: '',
  },
  {path:'trips',component:TableComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
