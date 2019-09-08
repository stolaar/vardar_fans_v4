import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribedUsersPage } from './subscribed-users.page';

describe('SubscribedUsersPage', () => {
  let component: SubscribedUsersPage;
  let fixture: ComponentFixture<SubscribedUsersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscribedUsersPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscribedUsersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
