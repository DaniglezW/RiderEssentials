import { NgModule } from '@angular/core';
import { CatalogComponent } from './components/catalog/catalog.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'catalog', component: CatalogComponent },
  { path: '', redirectTo: '/catalog', pathMatch: 'full' },
  { path: '**', redirectTo: '/catalog' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }