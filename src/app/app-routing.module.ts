import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './DashboardPage/dashboard/dashboard.component';
import { ProductsComponent } from './DashboardPage/products/products.component';
import { StatisticsComponent } from './DashboardPage/statistics/statistics.component';
import { PagesComponent } from './DashboardPage/pages/pages.component';
import { CoupensComponent } from './DashboardPage/coupens/coupens.component';
import { MediaComponent } from './DashboardPage/media/media.component';
import { SettingsComponent } from './DashboardPage/settings/settings.component';
import { AdminProfileComponent } from './DashboardPage/admin-profile/admin-profile.component';
import { LoginComponent } from './Authentification/login/login.component';
import { DashboardPageComponent } from './DashboardPage/DashboardPage.component';
import { SignupComponent } from './Authentification/signup/signup.component';

const routes: Routes = [
  {path:'',redirectTo:'dashboardpage',pathMatch:'full'},
  {path:'dashboardpage',component:DashboardPageComponent,
  children:[
     {path:'',redirectTo:'dashboard',pathMatch:'full'},
     {path:'dashboard',component:DashboardComponent },
     {path:'products',component:ProductsComponent},
     {path:'statistics',component:StatisticsComponent },
     {path:'pages',component:PagesComponent},
     {path:'coupens',component:CoupensComponent},
     {path:'media',component:MediaComponent},
     {path:'settings',component:SettingsComponent},
     {path:'profile',component:AdminProfileComponent},
    ] 
  },
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
