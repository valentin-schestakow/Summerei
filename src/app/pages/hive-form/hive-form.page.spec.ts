import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HiveFormPage } from './hive-form.page';

describe('HiveFormPage', () => {
  let component: HiveFormPage;
  let fixture: ComponentFixture<HiveFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HiveFormPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HiveFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
