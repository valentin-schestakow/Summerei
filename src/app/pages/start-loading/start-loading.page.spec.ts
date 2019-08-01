import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartLoadingPage } from './start-loading.page';

describe('StartLoadingPage', () => {
  let component: StartLoadingPage;
  let fixture: ComponentFixture<StartLoadingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartLoadingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartLoadingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
