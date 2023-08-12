import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompListSubMenuComponent } from './comp-list-sub-menu.component';

describe('CompListSubMenuComponent', () => {
  let component: CompListSubMenuComponent;
  let fixture: ComponentFixture<CompListSubMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompListSubMenuComponent]
    });
    fixture = TestBed.createComponent(CompListSubMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
