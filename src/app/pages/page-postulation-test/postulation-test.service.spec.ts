import { TestBed } from '@angular/core/testing';

import { PostulationTestService } from './postulation-test.service';

describe('PostulationTestService', () => {
  let service: PostulationTestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostulationTestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
