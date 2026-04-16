import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Post } from '../../models/posts.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-card-posts',
  imports: [DatePipe, RouterModule],
  templateUrl: './card-posts.html',
  standalone: true,
})
export class CardPosts {
  @Input({ required: true })
  post: Post = {} as Post;
}
