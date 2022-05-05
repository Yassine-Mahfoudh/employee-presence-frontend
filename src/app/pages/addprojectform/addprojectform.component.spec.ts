import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddprojectformComponent } from './addprojectform.component';

describe('AddprojectformComponent', () => {
  let component: AddprojectformComponent;
  let fixture: ComponentFixture<AddprojectformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddprojectformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddprojectformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
