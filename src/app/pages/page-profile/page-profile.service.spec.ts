import { TestBed } from '@angular/core/testing';

import { PageProfileService } from './page-profile.service';

describe('PageProfileService', () => {
  let service: PageProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
