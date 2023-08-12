import { TestBed } from '@angular/core/testing';
import { PositionTypeService } from './position-type.service';


describe('PagePositionTypeService', () => {
  let service: PositionTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PositionTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
