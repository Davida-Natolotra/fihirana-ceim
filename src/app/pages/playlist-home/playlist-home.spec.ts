import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistHome } from './playlist-home';

describe('PlaylistHome', () => {
  let component: PlaylistHome;
  let fixture: ComponentFixture<PlaylistHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaylistHome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaylistHome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
