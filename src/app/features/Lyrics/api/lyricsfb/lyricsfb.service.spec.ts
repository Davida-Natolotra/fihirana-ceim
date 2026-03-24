import { TestBed } from '@angular/core/testing';

import { Lyricsfb } from './lyricsfb.service';

describe('Lyricsfb', () => {
  let service: Lyricsfb;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Lyricsfb);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
