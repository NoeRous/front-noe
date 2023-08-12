import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageFormUserComponent } from './page-form-user.component';

describe('PageFormUserComponent', () => {
  let component: PageFormUserComponent;
  let fixture: ComponentFixture<PageFormUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageFormUserComponent]
    });
    fixture = TestBed.createComponent(PageFormUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
