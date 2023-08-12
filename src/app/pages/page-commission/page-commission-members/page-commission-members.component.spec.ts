import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageCommissionMembersComponent } from './page-commission-members.component';

describe('PageCommissionMembersComponent', () => {
  let component: PageCommissionMembersComponent;
  let fixture: ComponentFixture<PageCommissionMembersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageCommissionMembersComponent]
    });
    fixture = TestBed.createComponent(PageCommissionMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
