import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { PostSelectStore } from './select-post.store';
import { PostsService } from '../services/posts.service';
import { AuthStore } from '../../auth/login/store/login.store';
import { Post } from '../models/posts.model';

const createMockPost = (): Post => ({
  id: '1',
  userId: 1,
  title: 'test',
  body: 'body',
  tags: [],
  createdAt: new Date(),
});

describe('PostSelectStore', () => {
  let store: PostSelectStore;
  let postsServiceMock: {
    updatePost: ReturnType<typeof vi.fn>;
    deletePost: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    postsServiceMock = {
      updatePost: vi.fn().mockReturnValue(of({})),
      deletePost: vi.fn().mockReturnValue(of({})),
    };

    TestBed.configureTestingModule({
      providers: [
        PostSelectStore,
        {
          provide: PostsService,
          useValue: postsServiceMock,
        },
        {
          provide: AuthStore,
          useValue: {
            userId: () => 1,
          },
        },
      ],
    });

    store = TestBed.inject(PostSelectStore);
  });

  it('should return null if no post loaded', () => {
    store.setPostId(null as unknown as string); // 👈 clave

    const result = store.isOwner();
    expect(result).toBeNull();
  });

  it('should call updatePost service', () => {
    const post = createMockPost();

    store.updatePost(post);

    expect(postsServiceMock.updatePost).toHaveBeenCalledWith('1', post);
  });

  it('should call deletePost service', () => {
    store.deletePost('1');

    expect(postsServiceMock.deletePost).toHaveBeenCalledWith('1');
  });

  it('should reset delete state', () => {
    store.resetDeleteState();
    expect(store.deleteSuccess()).toBe(false);
  });

  it('should reset update state', () => {
    store.resetUpdateState();
    expect(store.updateSuccess()).toBe(false);
  });
});