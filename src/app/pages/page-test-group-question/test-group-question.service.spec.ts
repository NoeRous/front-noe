import { TestBed } from '@angular/core/testing';

import { TestGroupQuestionService } from './test-group-question.service';

describe('TestGroupQuestionService', () => {
  let service: TestGroupQuestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestGroupQuestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
