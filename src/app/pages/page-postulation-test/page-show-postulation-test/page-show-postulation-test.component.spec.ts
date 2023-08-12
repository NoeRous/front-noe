import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageShowPostulationTestComponent } from './page-show-postulation-test.component';

describe('PageShowPostulationTestComponent', () => {
  let component: PageShowPostulationTestComponent;
  let fixture: ComponentFixture<PageShowPostulationTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageShowPostulationTestComponent]
    });
    fixture = TestBed.createComponent(PageShowPostulationTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
