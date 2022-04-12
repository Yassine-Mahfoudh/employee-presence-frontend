import { TestBed } from '@angular/core/testing';

import { FonctionaliteService } from './fonctionalite.service';

describe('FonctionaliteService', () => {
  let service: FonctionaliteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FonctionaliteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
