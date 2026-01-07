import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistCreateDialog } from './playlist-create-dialog';

describe('PlaylistCreateDialog', () => {
  let component: PlaylistCreateDialog;
  let fixture: ComponentFixture<PlaylistCreateDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaylistCreateDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaylistCreateDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
