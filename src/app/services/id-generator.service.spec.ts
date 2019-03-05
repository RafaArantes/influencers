import { TestBed } from '@angular/core/testing';

import { IdGeneratorService } from './id-generator.service';

describe('IdGeneratorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IdGeneratorService = TestBed.get(IdGeneratorService);
    expect(service).toBeTruthy();
  });
});
