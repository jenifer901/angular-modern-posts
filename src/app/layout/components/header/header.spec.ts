import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppHeaderComponent } from './header';

describe('Header', () => {
  let component: AppHeaderComponent;
  let fixture: ComponentFixture<AppHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppHeaderComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
