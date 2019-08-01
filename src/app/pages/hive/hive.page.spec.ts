import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HivePage } from './hive.page';

describe('HivePage', () => {
  let component: HivePage;
  let fixture: ComponentFixture<HivePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HivePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HivePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
