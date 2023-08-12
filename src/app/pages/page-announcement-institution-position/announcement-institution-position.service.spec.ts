import { TestBed } from '@angular/core/testing';

import { AnnouncementInstitutionPositionService } from './announcement-institution-position.service';

describe('AnnouncementInstitutionPositionService', () => {
  let service: AnnouncementInstitutionPositionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnnouncementInstitutionPositionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
