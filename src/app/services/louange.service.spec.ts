import { TestBed } from '@angular/core/testing';

import { LouangeService } from './louange.service';

describe('LouangeService', () => {
  let service: LouangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LouangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
