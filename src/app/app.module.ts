import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BodyComponent } from './body/body.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductsComponent } from './components/products/products.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { CoupensComponent } from './components/coupens/coupens.component';
import { PagesComponent } from './pages/pages.component';
import { MediaComponent } from './components/media/media.component';
import { SettingsComponent } from './settings/settings.component';
import { HeaderComponent } from './header/header.component';
import { ChatComponent } from './components/chat/chat.component';
import { CdkMenuModule } from '@angular/cdk/menu';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog'
import { DialogEditComponent } from './components/dialog-edit/dialog-edit.component';
import { MatSelectModule } from '@angular/material/select'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { DataPropertyGetterPipe } from './components/table/data-property-getter.pipe/data-property-getter.pipe';

import { ReactiveFormsModule } from '@angular/forms';


import {
  CdkMenuItemRadio,
  CdkMenuItemCheckbox,
  CdkMenuGroup,
  CdkMenu,
  CdkMenuTrigger,
  CdkMenuItem,
  CdkMenuBar,
} from '@angular/cdk/menu';
import { InputComponent } from './components/input/input.component';
import { ButtonComponent } from './components/button/button.component';
import { TableComponent } from './components/table/table.component';



@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    SidenavComponent,
    DashboardComponent,
    StatisticsComponent,
    CoupensComponent,
    PagesComponent,
    MediaComponent,
    SettingsComponent,
    HeaderComponent,
    ChatComponent,
    AdminProfileComponent,
    DialogEditComponent,
    ProductsComponent,
    InputComponent,
    ButtonComponent,
    TableComponent,
    DataPropertyGetterPipe,
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
     MatTableModule,
     HttpClientModule,
     MatIconModule,
     MatButtonModule,
     FormsModule,
     MatInputModule,
     MatFormFieldModule,
     MatDialogModule,
     MatCardModule,
     MatGridListModule,
     MatSelectModule,
     BrowserAnimationsModule,
     CommonModule,
     ReactiveFormsModule,
     MatSortModule,
     MatSnackBarModule
     
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
