import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
import { TruncatePipe } from '../../core/pipes/truncate.pipe';
import { CatalogService } from '../catalog/services/catalog.service';

@NgModule({
    declarations: [
      ProductContainerComponent,
      ProductListComponent,
      ProductComponent,
      TruncatePipe
    ],
    imports: [
        CommonModule,
        FormsModule,
        PaginatorModule,
        ProductRouterModule,
        NgbCollapseModule,
        NgbDatepickerModule,
        PrimeNgModule,
        TranslateModule.forChild(),
    ],
    providers: [ProductService, CatalogService],
})
export class ProductModule { }
