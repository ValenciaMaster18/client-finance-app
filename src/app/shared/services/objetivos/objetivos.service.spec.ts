import { TestBed } from '@angular/core/testing';

import { ObjetivosService } from './objetivos.service';

describe('ObjetivosService', () => {
  let service: ObjetivosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObjetivosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
