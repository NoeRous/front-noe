import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompRoleComponent } from './comp-role.component';

describe('CompRoleComponent', () => {
  let component: CompRoleComponent;
  let fixture: ComponentFixture<CompRoleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompRoleComponent]
    });
    fixture = TestBed.createComponent(CompRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
