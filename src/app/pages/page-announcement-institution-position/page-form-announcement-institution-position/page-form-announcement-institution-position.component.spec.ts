import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageFormAnnouncementInstitutionPositionComponent } from './page-form-announcement-institution-position.component';

describe('PageFormAnnouncementInstitutionPositionComponent', () => {
  let component: PageFormAnnouncementInstitutionPositionComponent;
  let fixture: ComponentFixture<PageFormAnnouncementInstitutionPositionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageFormAnnouncementInstitutionPositionComponent]
    });
    fixture = TestBed.createComponent(PageFormAnnouncementInstitutionPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
