import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FlavorManagementComponent } from './flavor-management/flavor-management.component';
import { CategoriesComponent } from './categories/categories.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FlavorComponent } from './flavor/flavor.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NewFlavorComponent } from './new-flavor/new-flavor.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FlavorManagementComponent,
    CategoriesComponent,
    NavbarComponent,
    FlavorComponent,
    NewFlavorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
