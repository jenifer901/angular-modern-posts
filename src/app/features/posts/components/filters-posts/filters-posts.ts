import { Component, output, signal, input } from '@angular/core';
import { form } from '@angular/forms/signals';
import { FormsModule } from '@angular/forms';
import { SelectAuthor } from '../../models/select-author.model';
import { I18N_IMPORTS } from '../../../../shared/shared-imports';
import { PostFiltersForm } from '../../models/filter-post.model';

@Component({
  selector: 'app-filters-posts',
  imports: [FormsModule, I18N_IMPORTS],
  templateUrl: './filters-posts.html',
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
      [key]: value || null,
    }));
    this.filtersChange.emit(this.filtersModel());
  }

  clearFilters() {
    this.filtersForm().reset();
  }
}
