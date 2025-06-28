import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LyricEdit } from './lyric-edit';

describe('LyricEdit', () => {
  let component: LyricEdit;
  let fixture: ComponentFixture<LyricEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LyricEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LyricEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
