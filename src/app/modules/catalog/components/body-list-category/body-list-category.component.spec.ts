import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyListComponentCategory } from './body-list-category.component';

describe('BodyListComponent', () => {
  let component: BodyListComponentCategory;
  let fixture: ComponentFixture<BodyListComponentCategory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BodyListComponentCategory]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BodyListComponentCategory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
