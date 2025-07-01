import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallPromptDialog } from './install-prompt-dialog';

describe('InstallPromptDialog', () => {
  let component: InstallPromptDialog;
  let fixture: ComponentFixture<InstallPromptDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstallPromptDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstallPromptDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
