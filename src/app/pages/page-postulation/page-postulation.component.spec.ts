import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagePostulationComponent } from './page-postulation.component';

describe('PagePostulationComponent', () => {
  let component: PagePostulationComponent;
  let fixture: ComponentFixture<PagePostulationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PagePostulationComponent]
    });
    fixture = TestBed.createComponent(PagePostulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
