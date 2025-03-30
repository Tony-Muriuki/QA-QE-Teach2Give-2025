import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-user-selector',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-selector.component.html',
  styleUrls: ['./user-selector.component.scss'],
})
export class UserSelectorComponent implements OnInit {
  users: any[] = [];
  selectedUserId: number = 1;

  @Output() userSelected = new EventEmitter<number>();

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getUsers().subscribe((users) => {
      this.users = users;
      if (users.length > 0) {
        this.selectedUserId = users[0].id;
        this.userSelected.emit(this.selectedUserId);
      }
    });
  }

  onUserChange(): void {
    this.userSelected.emit(this.selectedUserId);
  }
}
