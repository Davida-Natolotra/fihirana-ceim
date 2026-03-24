import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistEdit } from './playlist-edit';

describe('PlaylistEdit', () => {
  let component: PlaylistEdit;
  let fixture: ComponentFixture<PlaylistEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaylistEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaylistEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
