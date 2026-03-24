import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragLists } from './drag-lists';

describe('DragLists', () => {
  let component: DragLists;
  let fixture: ComponentFixture<DragLists>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DragLists]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DragLists);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
