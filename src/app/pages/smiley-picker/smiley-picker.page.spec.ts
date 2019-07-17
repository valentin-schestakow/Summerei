import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmileyPickerPage } from './smiley-picker.page';

describe('SmileyPickerPage', () => {
  let component: SmileyPickerPage;
  let fixture: ComponentFixture<SmileyPickerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmileyPickerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmileyPickerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
