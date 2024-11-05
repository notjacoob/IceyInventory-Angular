import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FlavorComponent } from './flavor/flavor.component';
import { CategoriesComponent } from './categories/categories.component';
import { FlavorManagementComponent } from './flavor-management/flavor-management.component';
import { NewFlavorComponent } from './new-flavor/new-flavor.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'flavor-management', component: FlavorManagementComponent},
  {path: 'categories', component: CategoriesComponent},
  {path: 'flavor-management/new-flavor', component: NewFlavorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
