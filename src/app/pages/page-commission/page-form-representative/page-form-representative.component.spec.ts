import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageFormRepresentativeComponent } from './page-form-representative.component';

describe('PageFormRepresentativeComponent', () => {
  let component: PageFormRepresentativeComponent;
  let fixture: ComponentFixture<PageFormRepresentativeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageFormRepresentativeComponent]
    });
    fixture = TestBed.createComponent(PageFormRepresentativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
