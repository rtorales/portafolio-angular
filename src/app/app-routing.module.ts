import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PortafolioComponent } from './pages/portafolio/portafolio.component';
import { AboutComponent } from './pages/about/about.component';
import { ItemComponent } from './pages/item/item.component';

// especificar rutas de la aplicación
// tslint:disable-next-line:variable-name
const app_routes: Routes = [
  { path: 'home', component: PortafolioComponent},
  { path: 'about', component: AboutComponent},
  { path: 'item', component: ItemComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'home'} // el else
];

@NgModule({
  // configuración
  imports: [RouterModule.forRoot(app_routes, { useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
