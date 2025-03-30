import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserSelectorComponent } from './components/user-selector/user-selector.component';
import { PostListComponent } from './components/post-list/post-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, UserSelectorComponent, PostListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  selectedUserId: number = 1;

  onUserSelected(userId: number) {
    this.selectedUserId = userId;
  }
}
