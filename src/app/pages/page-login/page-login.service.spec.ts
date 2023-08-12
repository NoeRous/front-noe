import { TestBed } from '@angular/core/testing';

import { PageLoginService } from './page-login.service';

describe('PageLoginService', () => {
  let service: PageLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
