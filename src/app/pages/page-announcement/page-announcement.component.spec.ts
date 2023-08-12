import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAnnouncementComponent } from './page-announcement.component';

describe('PageAnnouncementComponent', () => {
  let component: PageAnnouncementComponent;
  let fixture: ComponentFixture<PageAnnouncementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageAnnouncementComponent]
    });
    fixture = TestBed.createComponent(PageAnnouncementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
