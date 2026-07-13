import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './checkout/checkout.component';
import { WishlistPageComponent } from './wishlist/wishlist.component';
import { GarageComponent } from './garage/garage.component';
import { FaqComponent } from './faq/faq.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  { path: 'checkout', component: CheckoutComponent },
  { path: 'wishlist', component: WishlistPageComponent },
  { path: 'garage', component: GarageComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'contact', component: ContactComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
