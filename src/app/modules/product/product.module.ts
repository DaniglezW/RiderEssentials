import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
    NgbCollapseModule,
    NgbDatepickerModule,
} from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

import { ProductRouterModule } from './product-routing.module';
import { PaginatorModule } from 'primeng/paginator';
import { PrimeNgModule } from '../../prime-ng.module';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductContainerComponent } from './components/product-component/product-container.component';
import { ProductComponent } from './view/product.component';
import { ProductService } from './services/productService.service';
import { CatalogService } from '../catalog/services/catalog.service';
import { LoadingSpinnerComponent } from '../ui/loading-spinner/loading-spinner.component';

@NgModule({
    declarations: [
      ProductContainerComponent,
      ProductListComponent,
      ProductComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        PaginatorModule,
        ProductRouterModule,
        NgbCollapseModule,
        NgbDatepickerModule,
        PrimeNgModule,
        TranslateModule.forChild(),
        LoadingSpinnerComponent,
    ],
    providers: [ProductService, CatalogService],
})
export class ProductModule { }
