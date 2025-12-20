import { TestBed } from '@angular/core/testing';

import { ExtralyricsService } from './extralyrics.service';

describe('ExtralyricsService', () => {
  let service: ExtralyricsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExtralyricsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
