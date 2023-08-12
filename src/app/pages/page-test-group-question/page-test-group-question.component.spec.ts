import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageTestGroupQuestionComponent } from './page-test-group-question.component';

describe('PageTestGroupQuestionComponent', () => {
  let component: PageTestGroupQuestionComponent;
  let fixture: ComponentFixture<PageTestGroupQuestionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageTestGroupQuestionComponent]
    });
    fixture = TestBed.createComponent(PageTestGroupQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
