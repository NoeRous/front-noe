import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageRoleMenuComponent } from './page-role-menu.component';

describe('PageRoleMenuComponent', () => {
  let component: PageRoleMenuComponent;
  let fixture: ComponentFixture<PageRoleMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageRoleMenuComponent]
    });
    fixture = TestBed.createComponent(PageRoleMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
