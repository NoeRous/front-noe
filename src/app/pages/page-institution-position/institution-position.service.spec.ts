import { TestBed } from '@angular/core/testing';

import { InstitutionPositionService } from './institution-position.service';

describe('InstitutionPositionService', () => {
  let service: InstitutionPositionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstitutionPositionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
