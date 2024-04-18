import { TestBed } from '@angular/core/testing';

import { ResponJefeAreaService } from './respon-jefe-area.service';

describe('ResponJefeAreaService', () => {
  let service: ResponJefeAreaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResponJefeAreaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
