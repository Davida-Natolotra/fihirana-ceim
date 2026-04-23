import { TestBed } from '@angular/core/testing';

import { TitleState } from './title.state';

describe('TitleState', () => {
  let service: TitleState;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TitleState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
