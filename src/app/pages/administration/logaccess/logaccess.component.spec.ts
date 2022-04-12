import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogaccessComponent } from './logaccess.component';

describe('LogaccessComponent', () => {
  let component: LogaccessComponent;
  let fixture: ComponentFixture<LogaccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogaccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogaccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
