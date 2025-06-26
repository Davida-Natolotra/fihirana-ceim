import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Lyric } from './lyric';

describe('Lyric', () => {
  let component: Lyric;
  let fixture: ComponentFixture<Lyric>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Lyric]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Lyric);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
