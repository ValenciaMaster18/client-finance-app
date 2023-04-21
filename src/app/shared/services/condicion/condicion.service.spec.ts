import { TestBed } from '@angular/core/testing';

import { CondicionService } from './condicion.service';

describe('CondicionService', () => {
  let service: CondicionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CondicionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
