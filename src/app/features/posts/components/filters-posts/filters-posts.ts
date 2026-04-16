import { Component, output, signal, input } from '@angular/core';
import { form } from '@angular/forms/signals';
import { FormsModule } from '@angular/forms';
import { SelectAuthor } from '../../models/select-author.model';

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
  //carga de datos en los filtros
  authors = input.required<SelectAuthor[]>();
  tags = input.required<string[]>();

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

  clearFilters() {
    this.filtersForm().reset();
  }
}
