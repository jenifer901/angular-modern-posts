import { HttpParams, httpResource } from '@angular/common/http';
import { Injectable, computed } from '@angular/core';
import { Enviroment } from '../../../../environments/environment';
import { Post } from '../models/posts.model';

@Injectable({ providedIn: 'root' })
export class FiltersStore {
  filtersResource = httpResource<Post[]>(() => ({
    url: `${Enviroment.apiUrl}/posts`,
    params: new HttpParams().set('_embed', 'user'),
  }));

  loading = this.filtersResource.isLoading;

  authors = computed(() => {
    const posts = this.filtersResource.value() ?? [];

    const map = new Map<string, string>();

    posts.forEach((p) => {
      if (p.userId && p.user?.name) {
        map.set(p.userId, p.user.name);
      }
    });

    return Array.from(map.entries()).map(([id, name]) => ({
      id,
      name,
    }));
  });

  tags = computed(() => {
    const posts = this.filtersResource.value() ?? [];

    const allTags = posts.flatMap((p) => p.tags ?? []);
    return [...new Set(allTags)];
  });
}
