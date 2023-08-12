import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagePostulationTestComponent } from './page-postulation-test.component';

describe('PagePostulationTestComponent', () => {
  let component: PagePostulationTestComponent;
  let fixture: ComponentFixture<PagePostulationTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PagePostulationTestComponent]
    });
    fixture = TestBed.createComponent(PagePostulationTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
