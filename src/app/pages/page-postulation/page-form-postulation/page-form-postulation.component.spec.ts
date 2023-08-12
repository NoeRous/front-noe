import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageFormPostulationComponent } from './page-form-postulation.component';

describe('PageFormPostulationComponent', () => {
  let component: PageFormPostulationComponent;
  let fixture: ComponentFixture<PageFormPostulationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageFormPostulationComponent]
    });
    fixture = TestBed.createComponent(PageFormPostulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
