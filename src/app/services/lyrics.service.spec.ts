import { TestBed } from '@angular/core/testing';

import { Lyrics } from './lyrics.service';

describe('Lyrics', () => {
  let service: Lyrics;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Lyrics);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
