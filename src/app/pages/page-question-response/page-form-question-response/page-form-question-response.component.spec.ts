import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageFormQuestionResponseComponent } from './page-form-question-response.component';

describe('PageFormQuestionResponseComponent', () => {
  let component: PageFormQuestionResponseComponent;
  let fixture: ComponentFixture<PageFormQuestionResponseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageFormQuestionResponseComponent]
    });
    fixture = TestBed.createComponent(PageFormQuestionResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
