import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageFormTestComponent } from './page-form-test.component';

describe('PageFormTestComponent', () => {
  let component: PageFormTestComponent;
  let fixture: ComponentFixture<PageFormTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageFormTestComponent]
    });
    fixture = TestBed.createComponent(PageFormTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
