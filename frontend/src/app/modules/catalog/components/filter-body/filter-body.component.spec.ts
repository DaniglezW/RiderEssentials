import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterBodyComponent } from './filter-body.component';

describe('FilterBodyComponent', () => {
  let component: FilterBodyComponent;
  let fixture: ComponentFixture<FilterBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterBodyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilterBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
