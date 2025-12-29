import { TestBed } from '@angular/core/testing';

import { ExtrafbService } from './extrafb.service';

describe('ExtrafbService', () => {
  let service: ExtrafbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExtrafbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
