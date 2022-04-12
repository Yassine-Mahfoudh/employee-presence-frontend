import { TestBed } from '@angular/core/testing';

import { SalleListService } from './salle-list.service';

describe('SalleListService', () => {
  let service: SalleListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalleListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
