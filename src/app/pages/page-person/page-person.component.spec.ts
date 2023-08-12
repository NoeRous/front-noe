import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagePersonComponent } from './page-person.component';

describe('PagePersonComponent', () => {
  let component: PagePersonComponent;
  let fixture: ComponentFixture<PagePersonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PagePersonComponent]
    });
    fixture = TestBed.createComponent(PagePersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
