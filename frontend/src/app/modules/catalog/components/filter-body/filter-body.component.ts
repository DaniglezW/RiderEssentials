import { Component } from '@angular/core';

@Component({
  selector: 'app-filter-body',
  templateUrl: './filter-body.component.html',
  styleUrl: './filter-body.component.scss'
})
export class FilterBodyComponent {
  rangeValues: number[] = [20, 80];
}
