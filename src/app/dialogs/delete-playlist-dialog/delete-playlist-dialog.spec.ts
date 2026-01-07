import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePlaylistDialog } from './delete-playlist-dialog';

describe('DeletePlaylistDialog', () => {
  let component: DeletePlaylistDialog;
  let fixture: ComponentFixture<DeletePlaylistDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeletePlaylistDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletePlaylistDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
