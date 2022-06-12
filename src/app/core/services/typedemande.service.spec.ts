import { TestBed } from '@angular/core/testing';

import { TypedemandeService } from './typedemande.service';

describe('TypedemandeService', () => {
  let service: TypedemandeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypedemandeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
