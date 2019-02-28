import { TestBed } from '@angular/core/testing';

import { SortByService } from './sort-by.service';

describe('SortByService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SortByService = TestBed.get(SortByService);
    expect(service).toBeTruthy();
  });
});
