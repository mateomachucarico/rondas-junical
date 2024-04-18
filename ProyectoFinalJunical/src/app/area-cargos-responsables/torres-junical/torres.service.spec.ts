import { TestBed } from '@angular/core/testing';

import { TorresService } from './torres.service';

describe('TorresService', () => {
  let service: TorresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TorresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
