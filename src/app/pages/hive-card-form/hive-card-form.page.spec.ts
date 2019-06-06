import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HiveCardFormPage } from './hive-card-form.page';

describe('HiveCardFormPage', () => {
  let component: HiveCardFormPage;
  let fixture: ComponentFixture<HiveCardFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HiveCardFormPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HiveCardFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
