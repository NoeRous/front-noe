import { TestBed } from '@angular/core/testing';

import { PagePostulationService } from './page-postulation.service';

describe('PagePostulationService', () => {
  let service: PagePostulationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PagePostulationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
