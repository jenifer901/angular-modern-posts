import { Component, output, signal, input } from '@angular/core';
import { form } from '@angular/forms/signals';
import { FormsModule } from '@angular/forms';
import { User } from '../../../../core/models/user.model';

export interface PostFiltersForm {
  userId: string | null;
  tag: string | null;
}

@Component({
  selector: 'app-filters-posts',
  imports: [FormsModule],
  templateUrl: './filters-posts.html',
  styleUrl: './filters-posts.css',
  standalone: true,
})
export class FiltersPosts {
  /**TODO: carga de datos en los filtros */
  authors = input<User[]>([
    {
      id: '1',
      name: 'alice',
      password: 'alice123',
      email: 'alice@example.com',
      avatar: 'https://api.dicebear.com/9.x/thumbs/svg?seed=alice',
    },
    {
      id: '2',
      name: 'bruno',
      password: 'bruno123',
      email: 'bruno@example.com',
      avatar: 'https://api.dicebear.com/9.x/thumbs/svg?seed=bruno',
    },
    {
      id: '3',
      name: 'carla',
      password: 'carla123',
      email: 'carla@example.com',
      avatar: 'https://api.dicebear.com/9.x/thumbs/svg?seed=carla',
    },
    {
      id: '4',
      name: 'diego',
      password: 'diego123',
      email: 'diego@example.com',
      avatar: 'https://api.dicebear.com/9.x/thumbs/svg?seed=diego',
    },
  ]);
  tags = input<string[]>(['angular', 'signal']);

  filtersChange = output<PostFiltersForm>();

  filtersModel = signal<PostFiltersForm>({
    userId: null,
    tag: null,
  });

  filtersForm = form(this.filtersModel);

  updateSelect(event: Event, key: 'userId' | 'tag') {
    const value = (event.target as HTMLSelectElement).value || null;

    this.filtersModel.update((v) => ({
      ...v,
      [key]: value,
    }));
    this.filtersChange.emit(this.filtersModel());
  }

  /* clearFilters() {
    this.filtersForm.reset()
  }*/
}
