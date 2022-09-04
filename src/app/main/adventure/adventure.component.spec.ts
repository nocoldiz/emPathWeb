import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdventureComponent } from './adventure.component';

describe('ProfileComponent', () => {
  let component: AdventureComponent;
  let fixture: ComponentFixture<AdventureComponent>;
  AdventureComponent;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdventureComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdventureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
