import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { CommentListComponent } from '../comment-list/comment-list.component';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, CommentListComponent],
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {
  @Input() userId!: number;
  posts: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  ngOnChanges(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    if (this.userId) {
      this.apiService.getPostsByUser(this.userId).subscribe((posts) => {
        this.posts = posts.map((post) => ({
          ...post,
          showComments: false, // Initialize comments as hidden
        }));
      });
    }
  }

  toggleComments(post: any): void {
    post.showComments = !post.showComments;
  }
}
