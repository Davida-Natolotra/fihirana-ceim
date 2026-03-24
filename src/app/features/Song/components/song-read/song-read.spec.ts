import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongRead } from './song-read';

describe('SongRead', () => {
  let component: SongRead;
  let fixture: ComponentFixture<SongRead>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SongRead]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SongRead);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
