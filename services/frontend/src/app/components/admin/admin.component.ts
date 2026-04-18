import { Component } from '@angular/core';
import { UserManagementComponent } from './user-management/user-management.component';
import { CategoryManagementComponent } from './category-management/category-management.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  standalone: true,
  imports: [UserManagementComponent, CategoryManagementComponent, CommonModule]
})
export class AdminDashboard {

  activeTab: string = 'users';

  constructor() { }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
}
