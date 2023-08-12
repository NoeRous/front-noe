import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageFormAnnounmentComponent } from './page-form-announment.component';

describe('PageFormAnnounmentComponent', () => {
  let component: PageFormAnnounmentComponent;
  let fixture: ComponentFixture<PageFormAnnounmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageFormAnnounmentComponent]
    });
    fixture = TestBed.createComponent(PageFormAnnounmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
