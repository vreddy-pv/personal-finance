import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { Category } from '../../../model/category.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-category-management',
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class CategoryManagementComponent implements OnInit {

  categories: Category[] = [];
  newCategoryName: string = '';

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.adminService.getAllCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
    });
  }

  addCategory(): void {
    const newCategory: Category = { name: this.newCategoryName };
    this.adminService.addCategory(newCategory).subscribe(() => {
      this.loadCategories();
      this.newCategoryName = '';
    });
  }
}
