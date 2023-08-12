import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAnnouncementInstitutionPositionComponent } from './page-announcement-institution-position.component';

describe('PageAnnouncementInstitutionPositionComponent', () => {
  let component: PageAnnouncementInstitutionPositionComponent;
  let fixture: ComponentFixture<PageAnnouncementInstitutionPositionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageAnnouncementInstitutionPositionComponent]
    });
    fixture = TestBed.createComponent(PageAnnouncementInstitutionPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
