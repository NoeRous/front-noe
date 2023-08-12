import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompFormQuestionResponseComponent } from './comp-form-question-response.component';

describe('CompFormQuestionResponseComponent', () => {
  let component: CompFormQuestionResponseComponent;
  let fixture: ComponentFixture<CompFormQuestionResponseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompFormQuestionResponseComponent]
    });
    fixture = TestBed.createComponent(CompFormQuestionResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
