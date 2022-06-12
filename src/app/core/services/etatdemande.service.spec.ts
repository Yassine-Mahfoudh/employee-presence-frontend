import { TestBed } from '@angular/core/testing';

import { EtatdemandeService } from './etatdemande.service';

describe('EtatdemandeService', () => {
  let service: EtatdemandeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EtatdemandeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
