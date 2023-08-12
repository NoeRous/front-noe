import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageRegisterPersonComponent } from './page-register-person.component';

describe('PageRegisterPersonComponent', () => {
  let component: PageRegisterPersonComponent;
  let fixture: ComponentFixture<PageRegisterPersonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageRegisterPersonComponent]
    });
    fixture = TestBed.createComponent(PageRegisterPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
