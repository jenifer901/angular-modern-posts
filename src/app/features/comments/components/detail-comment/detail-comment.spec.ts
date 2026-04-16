import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailComment } from './detail-comment';

describe('DetailComment', () => {
  let component: DetailComment;
  let fixture: ComponentFixture<DetailComment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailComment],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailComment);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
