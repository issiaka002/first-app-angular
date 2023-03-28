import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminTemplateComponent } from './admin-template/admin-template.component';
import { CostumersComponent } from './costumers/costumers.component';
import { AuthGuard } from './guard/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';


//..Declaration des routes
const routes: Routes = [
  //..
  {path:"", component:LoginComponent},
  {path:"admin", component:AdminTemplateComponent, canActivate:[AuthGuard] ,children: [
    {path:"costumers", component:CostumersComponent},
    {path:"products", component:ProductsComponent},
    {path:"home", component:HomeComponent},
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
