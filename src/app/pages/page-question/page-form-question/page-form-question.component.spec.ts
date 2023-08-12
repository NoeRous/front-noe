import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageFormQuestionComponent } from './page-form-question.component';

describe('PageFormQuestionComponent', () => {
  let component: PageFormQuestionComponent;
  let fixture: ComponentFixture<PageFormQuestionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageFormQuestionComponent]
    });
    fixture = TestBed.createComponent(PageFormQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
