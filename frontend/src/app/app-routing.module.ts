import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './modules/ui/layout/layout.component';

const routes: Routes = [
  { path: '', redirectTo: '/catalog', pathMatch: 'full' },
  {
    path: 'catalog',
    component: LayoutComponent,
    loadChildren: () =>
      import('./modules/catalog/catalog.module').then(
        (m) => m.CatalogModule
      ),
  },
  {
    path: 'profile',
    component: LayoutComponent,
    loadChildren: () =>
      import('./modules/profile/profile.module').then(
        (m) => m.ProfileModule
      ),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
