import { TestBed } from '@angular/core/testing';

import { InversionService } from './inversion.service';

describe('InversionService', () => {
  let service: InversionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InversionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
