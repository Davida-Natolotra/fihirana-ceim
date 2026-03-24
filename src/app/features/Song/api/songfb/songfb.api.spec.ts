import { TestBed } from '@angular/core/testing';

import { SongfbApi } from './songfb.api';

describe('SongfbApi', () => {
  let service: SongfbApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SongfbApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
