import { TestBed } from '@angular/core/testing';

import { FilterByService } from './filter-by.service';

describe('FilterByService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FilterByService = TestBed.get(FilterByService);
    expect(service).toBeTruthy();
  });
});
