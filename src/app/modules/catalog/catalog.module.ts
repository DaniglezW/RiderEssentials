import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbCollapseModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { PaginatorModule } from 'primeng/paginator';
import { CatalogRouterModule } from './catalog-routing.module';
import { CatalogService } from './services/catalog.service';
import { CatalogComponent } from './view/catalog.component';
import { FilterBodyComponent } from './components/filter-body/filter-body.component';
import { BodyListComponent } from './components/body-list/body-list.component';
import { PrimeNgModule } from '../../prime-ng.module';
import { BodyListComponentCategory } from './components/body-list-category/body-list-category.component';
import { TruncatePipe } from '@/app/core/pipes/truncate.pipe';
import { LoadingSpinnerComponent } from '../ui/loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    CatalogComponent,
    FilterBodyComponent,
    BodyListComponent,
    BodyListComponentCategory,
    TruncatePipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    PaginatorModule,
    CatalogRouterModule,
    NgbCollapseModule,
    NgbDatepickerModule,
    PrimeNgModule,
    TranslateModule.forChild(),
    LoadingSpinnerComponent,
  ],
  providers: [CatalogService],
})
export class CatalogModule {}
