import { TestBed } from '@angular/core/testing';

import { TestGroupService } from './test-group.service';

describe('TestGroupService', () => {
  let service: TestGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
