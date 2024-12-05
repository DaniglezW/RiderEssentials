import { NgModule } from '@angular/core';

import { SidebarModule } from 'primeng/sidebar';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { PanelModule } from 'primeng/panel';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToolbarModule } from 'primeng/toolbar';
import { InputNumberModule } from 'primeng/inputnumber';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { TabViewModule } from 'primeng/tabview';
import { CalendarModule } from 'primeng/calendar';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { RatingModule } from 'primeng/rating';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { FormsModule } from '@angular/forms';
import { SliderModule } from 'primeng/slider';

const MODULES = [
  SidebarModule,
  MenubarModule,
  ButtonModule,
  MenuModule,
  TableModule,
  DialogModule,
  InputTextModule,
  DropdownModule,
  PanelModule,
  CardModule,
  ToastModule,
  SliderModule,
  ProgressSpinnerModule,
  ToolbarModule,
  InputNumberModule,
  RadioButtonModule,
  ConfirmDialogModule,
  MultiSelectModule,
  TabViewModule,
  CalendarModule,
  TieredMenuModule,
  RatingModule,
  InputIconModule,
  IconFieldModule,
  InputTextModule,
  FormsModule,
  DropdownModule,
];

@NgModule({
  imports: [...MODULES],
  declarations: [],
  exports: [...MODULES],
})
export class PrimeNgModule {}
