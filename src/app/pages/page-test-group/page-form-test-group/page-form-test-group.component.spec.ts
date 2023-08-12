import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageFormTestGroupComponent } from './page-form-test-group.component';

describe('PageFormTestGroupComponent', () => {
  let component: PageFormTestGroupComponent;
  let fixture: ComponentFixture<PageFormTestGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageFormTestGroupComponent]
    });
    fixture = TestBed.createComponent(PageFormTestGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
