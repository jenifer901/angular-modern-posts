import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationPost } from './pagination-posts';

describe('PaginationPosts', () => {
  let component: PaginationPost;
  let fixture: ComponentFixture<PaginationPost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationPost],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationPost);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
