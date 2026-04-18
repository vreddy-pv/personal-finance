import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { User } from '../../../model/user.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class UserManagementComponent implements OnInit {

  users: User[] = [];

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.adminService.getAllUsers().subscribe((users: User[]) => {
      this.users = users.map(user => ({ ...user, newPassword: '' }));
    });
  }

  createUser(user: User): void {
    this.adminService.createUser(user).subscribe(() => {
      this.loadUsers();
    });
  }

  updateUser(user: User): void {
    const userToUpdate = { ...user };
    if (userToUpdate.newPassword) {
      userToUpdate.password = userToUpdate.newPassword;
    }
    this.adminService.updateUser(userToUpdate.username, userToUpdate).subscribe(() => {
      this.loadUsers();
    });
  }

  deleteUser(username: string): void {
    this.adminService.deleteUser(username).subscribe(() => {
      this.loadUsers();
    });
  }
}
