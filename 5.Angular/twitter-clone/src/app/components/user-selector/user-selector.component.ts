import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-user-selector',
  standalone: true, // Standalone component
  imports: [CommonModule, FormsModule], // Import necessary modules
  templateUrl: './user-selector.component.html',
  styleUrls: ['./user-selector.component.scss'],
})
export class UserSelectorComponent implements OnInit {
  users: any[] = [];
  selectedUserId: number = 1;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }
}
