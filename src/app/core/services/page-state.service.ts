import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PageStateService {
  page = 0;
  rows = 12;
}
