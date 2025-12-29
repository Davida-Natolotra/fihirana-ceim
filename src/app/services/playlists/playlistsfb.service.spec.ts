import { TestBed } from '@angular/core/testing';

import { PlaylistsfbService } from './playlistsfb.service';

describe('PlaylistsfbService', () => {
  let service: PlaylistsfbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlaylistsfbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
