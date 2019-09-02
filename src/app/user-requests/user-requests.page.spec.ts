import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRequestsPage } from './user-requests.page';

describe('UserRequestsPage', () => {
  let component: UserRequestsPage;
  let fixture: ComponentFixture<UserRequestsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRequestsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRequestsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
