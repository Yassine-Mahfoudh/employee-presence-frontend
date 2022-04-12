import { TestBed } from '@angular/core/testing';

import { DemandeListService } from './demande-list.service';

describe('DemandeListService', () => {
  let service: DemandeListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DemandeListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
