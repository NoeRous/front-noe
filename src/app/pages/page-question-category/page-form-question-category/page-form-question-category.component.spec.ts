import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageFormQuestionCategoryComponent } from './page-form-question-category.component';

describe('PageFormQuestionCategoryComponent', () => {
  let component: PageFormQuestionCategoryComponent;
  let fixture: ComponentFixture<PageFormQuestionCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageFormQuestionCategoryComponent]
    });
    fixture = TestBed.createComponent(PageFormQuestionCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
