import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageShowDetailsPostulationComponent } from './page-show-details-postulation.component';

describe('PageShowDetailsPostulationComponent', () => {
  let component: PageShowDetailsPostulationComponent;
  let fixture: ComponentFixture<PageShowDetailsPostulationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageShowDetailsPostulationComponent]
    });
    fixture = TestBed.createComponent(PageShowDetailsPostulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
