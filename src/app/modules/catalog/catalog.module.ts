import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
    NgbCollapseModule,
    NgbDatepickerModule,
} from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

import { CatalogRouterModule } from './catalog-routing.module';
import { CatalogService } from './services/catalog.service';
import { CatalogComponent } from './view/catalog.component';
import { PaginatorModule } from 'primeng/paginator';
import { FilterBodyComponent } from './components/filter-body/filter-body.component';
import { BodyListComponent } from './components/body-list/body-list.component';
import { PrimeNgModule } from '../../prime-ng.module';
import { BodyListComponentCategory } from './components/body-list-category/body-list-category.component';
import { TruncatePipe } from '@/app/core/pipes/truncate.pipe';

@NgModule({
    declarations: [
        CatalogComponent,
        FilterBodyComponent,
        BodyListComponent,
        BodyListComponentCategory,
        TruncatePipe
    ],
    imports: [
        CommonModule,
        FormsModule,
        PaginatorModule,
        CatalogRouterModule,
        NgbCollapseModule,
        NgbDatepickerModule,
        PrimeNgModule,
        TranslateModule.forChild(),
    ],
    providers: [CatalogService],
})
export class CatalogModule { }
