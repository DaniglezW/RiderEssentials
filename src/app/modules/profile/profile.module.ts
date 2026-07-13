import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbCollapseModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { PaginatorModule } from 'primeng/paginator';
import { ProfileRouterModule } from './profile-routing.module';
import { ProfileService } from './services/profile.service';
import { ProfileComponent } from './view/profile.component';
import { PrimeNgModule } from '../../prime-ng.module';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    PaginatorModule,
    ProfileRouterModule,
    NgbCollapseModule,
    NgbDatepickerModule,
    PrimeNgModule,
    TranslateModule.forChild(),
  ],
  providers: [ProfileService],
})
export class ProfileModule {}
