import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageQuestionCategoryComponent } from './page-question-category.component';

describe('PageQuestionCategoryComponent', () => {
  let component: PageQuestionCategoryComponent;
  let fixture: ComponentFixture<PageQuestionCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageQuestionCategoryComponent]
    });
    fixture = TestBed.createComponent(PageQuestionCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
