import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeLouange } from './home-louange';

describe('HomeLouange', () => {
  let component: HomeLouange;
  let fixture: ComponentFixture<HomeLouange>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeLouange]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeLouange);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
