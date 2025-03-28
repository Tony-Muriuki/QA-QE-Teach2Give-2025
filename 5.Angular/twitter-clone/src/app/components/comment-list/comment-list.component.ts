import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-comment-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
})
export class CommentListComponent implements OnInit {
  @Input() postId!: number; // Ensure this input exists
  comments: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    if (this.postId) {
      this.apiService.getCommentsByPost(this.postId).subscribe((comments) => {
        this.comments = comments;
      });
    }
  }
}
