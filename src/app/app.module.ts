import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BodyComponent } from './DashboardPage/body/body.component';
import { SidenavComponent } from './DashboardPage/sidenav/sidenav.component';
import { DashboardComponent } from './DashboardPage/dashboard/dashboard.component';
import { ProductsComponent } from './DashboardPage/products/products.component';
import { StatisticsComponent } from './DashboardPage/statistics/statistics.component';
import { CoupensComponent } from './DashboardPage/coupens/coupens.component';
import { PagesComponent } from './DashboardPage/pages/pages.component';
import { MediaComponent } from './DashboardPage/media/media.component';
import { SettingsComponent } from './DashboardPage/settings/settings.component';
import { HeaderComponent } from './DashboardPage/header/header.component';
import { ChatComponent } from './DashboardPage/chat/chat.component';
import { CdkMenuModule } from '@angular/cdk/menu';
import { OverlayModule } from '@angular/cdk/overlay';
import { AdminProfileComponent } from './DashboardPage/admin-profile/admin-profile.component';
import { DashboardPageComponent } from './DashboardPage/DashboardPage.component';
import {
  CdkMenuItemRadio,
  CdkMenuItemCheckbox,
  CdkMenuGroup,
  CdkMenu,
  CdkMenuTrigger,
  CdkMenuItem,
  CdkMenuBar,
} from '@angular/cdk/menu';
import { LoginComponent } from './Authentification/login/login.component';
import { SignupComponent } from './Authentification/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthValidatorsService } from './Authentification/auth-validators.service';
import { AuthGuardService } from './Authentification/auth-guard.service';
import { AuthGuard2Service } from './Authentification/auth-guard2.service';




@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    SidenavComponent,
    DashboardComponent,
    ProductsComponent,
    StatisticsComponent,
    CoupensComponent,
    PagesComponent,
    MediaComponent,
    SettingsComponent,
    HeaderComponent,
    ChatComponent,
    AdminProfileComponent,
    LoginComponent,
    DashboardPageComponent,
    SignupComponent
    
    
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
     CdkMenuModule,
     OverlayModule,
     CdkMenuBar,
     CdkMenuItem,
     CdkMenuTrigger,
     CdkMenu,
     CdkMenuGroup,
     CdkMenuItemCheckbox,
     CdkMenuItemRadio,
     FormsModule,
     ReactiveFormsModule,
     HttpClientModule,
  ],

  providers: [AuthValidatorsService,
              AuthGuardService,
              AuthGuard2Service],
  bootstrap: [AppComponent]
})
export class AppModule { }
