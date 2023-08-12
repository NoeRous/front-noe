import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageCommissionMembersExtComponent } from './page-commission-members-ext.component';

describe('PageCommissionMembersExtComponent', () => {
  let component: PageCommissionMembersExtComponent;
  let fixture: ComponentFixture<PageCommissionMembersExtComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageCommissionMembersExtComponent]
    });
    fixture = TestBed.createComponent(PageCommissionMembersExtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
