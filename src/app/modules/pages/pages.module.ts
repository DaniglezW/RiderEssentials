import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { PrimeNgModule } from '../../prime-ng.module';
import { PagesRoutingModule } from './pages-routing.module';
import { CheckoutComponent } from './checkout/checkout.component';
import { WishlistPageComponent } from './wishlist/wishlist.component';
import { GarageComponent } from './garage/garage.component';
import { FaqComponent } from './faq/faq.component';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  declarations: [
    CheckoutComponent,
    WishlistPageComponent,
    GarageComponent,
    FaqComponent,
    ContactComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
    RouterModule,
    PrimeNgModule,
    PagesRoutingModule,
  ],
})
export class PagesModule {}
