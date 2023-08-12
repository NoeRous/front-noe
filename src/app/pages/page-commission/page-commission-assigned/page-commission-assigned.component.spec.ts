import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageCommissionAssignedComponent } from './page-commission-assigned.component';

describe('PageCommissionAssignedComponent', () => {
  let component: PageCommissionAssignedComponent;
  let fixture: ComponentFixture<PageCommissionAssignedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageCommissionAssignedComponent]
    });
    fixture = TestBed.createComponent(PageCommissionAssignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
