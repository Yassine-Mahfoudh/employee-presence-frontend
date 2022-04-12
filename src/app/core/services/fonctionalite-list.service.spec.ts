import { TestBed } from '@angular/core/testing';

import { FonctionaliteListService } from './fonctionalite-list.service';

describe('FonctionaliteListService', () => {
  let service: FonctionaliteListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FonctionaliteListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
