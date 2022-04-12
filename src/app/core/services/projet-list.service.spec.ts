import { TestBed } from '@angular/core/testing';

import { ProjetListService } from './projet-list.service';

describe('ProjetListService', () => {
  let service: ProjetListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjetListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
