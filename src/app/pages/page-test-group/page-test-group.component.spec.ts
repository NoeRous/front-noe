import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageTestGroupComponent } from './page-test-group.component';

describe('PageTestGroupComponent', () => {
  let component: PageTestGroupComponent;
  let fixture: ComponentFixture<PageTestGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageTestGroupComponent]
    });
    fixture = TestBed.createComponent(PageTestGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
