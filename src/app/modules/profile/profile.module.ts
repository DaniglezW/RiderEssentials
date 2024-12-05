import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
    NgbCollapseModule,
    NgbDatepickerModule,
} from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

import { ProfileRouterModule } from './profile-routing.module';
import { ProfileService } from './services/profile.service';
import { ProfileComponent } from './view/profile.component';
import { PaginatorModule } from 'primeng/paginator';

@NgModule({
    declarations: [
        ProfileComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        PaginatorModule,
        ProfileRouterModule,
        NgbCollapseModule,
        NgbDatepickerModule,
        TranslateModule.forChild(),
    ],
    providers: [ProfileService],
})
export class ProfileModule { }
