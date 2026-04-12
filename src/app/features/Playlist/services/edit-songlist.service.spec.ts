import { TestBed } from '@angular/core/testing';

import { EditSonglistService } from './edit-songlist.service';

describe('EditSonglistService', () => {
  let service: EditSonglistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditSonglistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
