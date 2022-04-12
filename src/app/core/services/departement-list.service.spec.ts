import { TestBed } from '@angular/core/testing';

import { DepartementListService } from './departement-list.service';

describe('DepartementListService', () => {
  let service: DepartementListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepartementListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
