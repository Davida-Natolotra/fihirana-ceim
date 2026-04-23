import { TestBed } from '@angular/core/testing';

import { TruncatedStringFn } from './truncated-string.fn';

describe('TruncatedStringFn', () => {
  let service: TruncatedStringFn;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TruncatedStringFn);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
