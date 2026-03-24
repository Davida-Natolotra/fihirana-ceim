import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtraLists } from './extra-lists';

describe('ExtraLists', () => {
  let component: ExtraLists;
  let fixture: ComponentFixture<ExtraLists>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExtraLists]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExtraLists);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
