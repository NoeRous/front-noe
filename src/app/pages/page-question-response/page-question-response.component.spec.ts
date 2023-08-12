import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageQuestionResponseComponent } from './page-question-response.component';

describe('PageQuestionResponseComponent', () => {
  let component: PageQuestionResponseComponent;
  let fixture: ComponentFixture<PageQuestionResponseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageQuestionResponseComponent]
    });
    fixture = TestBed.createComponent(PageQuestionResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
