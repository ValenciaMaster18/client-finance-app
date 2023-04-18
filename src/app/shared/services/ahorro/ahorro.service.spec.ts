import { TestBed } from '@angular/core/testing';

import { AhorroService } from './ahorro.service';

describe('AhorroService', () => {
  let service: AhorroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AhorroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
