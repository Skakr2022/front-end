import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductsComponent } from './components/products/products.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { PagesComponent } from './pages/pages.component';
import { CoupensComponent } from './components/coupens/coupens.component';
import { MediaComponent } from './components/media/media.component';
import { SettingsComponent } from './settings/settings.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';

const routes: Routes = [
  {path:'',redirectTo:'dashboard',pathMatch:'full'},
  {path:'dashboard',component:DashboardComponent},
  {path:'products',component:ProductsComponent},
  {path:'statistics',component:StatisticsComponent},
  {path:'pages',component:PagesComponent},
  {path:'coupens',component:CoupensComponent},
  {path:'media',component:MediaComponent},
  {path:'settings',component:SettingsComponent},
  {path:'profile',component:AdminProfileComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
