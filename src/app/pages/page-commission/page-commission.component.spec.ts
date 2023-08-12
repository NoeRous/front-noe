import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageCommissionComponent } from './page-commission.component';

describe('PageCommissionComponent', () => {
  let component: PageCommissionComponent;
  let fixture: ComponentFixture<PageCommissionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageCommissionComponent]
    });
    fixture = TestBed.createComponent(PageCommissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
