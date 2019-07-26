import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HivedetailPage } from './hivedetail.page';

describe('HivedetailPage', () => {
  let component: HivedetailPage;
  let fixture: ComponentFixture<HivedetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HivedetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HivedetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
