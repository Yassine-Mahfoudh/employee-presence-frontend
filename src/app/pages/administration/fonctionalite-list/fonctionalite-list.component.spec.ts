import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FonctionaliteListComponent } from './fonctionalite-list.component';

describe('FonctionaliteListComponent', () => {
  let component: FonctionaliteListComponent;
  let fixture: ComponentFixture<FonctionaliteListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FonctionaliteListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FonctionaliteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
