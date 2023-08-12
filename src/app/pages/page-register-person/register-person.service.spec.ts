import { TestBed } from '@angular/core/testing';

import { RegisterPersonService } from './register-person.service';

describe('RegisterPersonService', () => {
  let service: RegisterPersonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterPersonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
