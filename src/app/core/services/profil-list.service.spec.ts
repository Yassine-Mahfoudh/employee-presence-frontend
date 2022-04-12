import { TestBed } from '@angular/core/testing';

import { ProfilListService } from './profil-list.service';

describe('ProfilListService', () => {
  let service: ProfilListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfilListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
