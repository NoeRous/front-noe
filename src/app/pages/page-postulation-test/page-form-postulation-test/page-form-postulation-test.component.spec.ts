import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageFormPostulationTestComponent } from './page-form-postulation-test.component';

describe('PageFormPostulationTestComponent', () => {
  let component: PageFormPostulationTestComponent;
  let fixture: ComponentFixture<PageFormPostulationTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageFormPostulationTestComponent]
    });
    fixture = TestBed.createComponent(PageFormPostulationTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
