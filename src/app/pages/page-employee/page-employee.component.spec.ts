import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageEmployeeComponent } from './page-employee.component';

describe('PageEmployeeComponent', () => {
  let component: PageEmployeeComponent;
  let fixture: ComponentFixture<PageEmployeeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageEmployeeComponent]
    });
    fixture = TestBed.createComponent(PageEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
