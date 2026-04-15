import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersPosts } from './filters-posts';

describe('FiltersPosts', () => {
  let component: FiltersPosts;
  let fixture: ComponentFixture<FiltersPosts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltersPosts],
    }).compileComponents();

    fixture = TestBed.createComponent(FiltersPosts);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
