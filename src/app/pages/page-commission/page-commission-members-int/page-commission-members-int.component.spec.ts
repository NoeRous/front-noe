import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageCommissionMembersIntComponent } from './page-commission-members-int.component';

describe('PageCommissionMembersIntComponent', () => {
  let component: PageCommissionMembersIntComponent;
  let fixture: ComponentFixture<PageCommissionMembersIntComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageCommissionMembersIntComponent]
    });
    fixture = TestBed.createComponent(PageCommissionMembersIntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
