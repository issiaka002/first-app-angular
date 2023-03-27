import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CostumersComponent } from './costumers/costumers.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';


//..Declaration des routes
const routes: Routes = [
  {path:"products", component:ProductsComponent},
  {path:"costumers", component:CostumersComponent},
  {path:"home", component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
