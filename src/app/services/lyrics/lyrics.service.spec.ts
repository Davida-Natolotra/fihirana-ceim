import { TestBed } from '@angular/core/testing';

import { LyricsService } from '../lyrics/lyrics.service';

describe('Lyrics', () => {
  let service: LyricsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LyricsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
