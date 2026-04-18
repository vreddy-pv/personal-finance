import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { ApiService } from '../../services/api';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { StateService } from '../../services/state';

@Component({
  selector: 'app-add-transaction-dialog',
  templateUrl: './add-transaction-dialog.html',
  styleUrls: ['./add-transaction-dialog.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    CommonModule,
    MatDatepickerModule,
    MatDialogModule
  ],
})
export class AddTransactionDialogComponent implements OnInit {
  form: FormGroup;
  isEditMode: boolean;
  categories: any[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddTransactionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService: ApiService,
    private stateService: StateService
  ) {
    this.isEditMode = !!this.data;
    this.form = this.fb.group({
      date: [this.data?.date || ''],
      description: [this.data?.description || ''],
      amount: [this.data?.amount || ''],
      category: [this.data?.category?.name || ''],
      newCategory: [''],
      type: [this.data?.type || ''],
    });
  }

  ngOnInit(): void {
    this.loadCategories();
    this.stateService.refreshTransactions$.subscribe(() => {
      this.loadCategories();
    });
  }

  loadCategories() {
    this.apiService.getAllCategories().subscribe(data => {
      this.categories = data;
    });
  }

  save() {
    const { date, description, amount, category, newCategory, type } = this.form.value;
    const isNewCategory = category === 'Other';
    const categoryToSave = isNewCategory ? newCategory : category;

    const transaction = {
      id: this.data?.id,
      date,
      description,
      amount,
      category: { name: categoryToSave },
      type
    };

    if (isNewCategory) {
      this.apiService.addCategory({ name: categoryToSave }).subscribe(() => {
        this.saveTransaction(transaction);
      });
    } else {
      this.saveTransaction(transaction);
    }
  }

  saveTransaction(transaction: any) {
    if (this.isEditMode) {
      this.apiService.updateTransaction(transaction.id, transaction).subscribe({
        next: () => {
          this.stateService.notifyTransactionListChanged();
          this.dialogRef.close();
        },
        error: (err) => console.error('Error updating transaction:', err)
      });
    } else {
      this.apiService.addTransaction(transaction).subscribe({
        next: () => {
          this.stateService.notifyTransactionListChanged();
          this.dialogRef.close();
        },
        error: (err) => console.error('Error adding transaction:', err)
      });
    }
  }

  close() {
    this.dialogRef.close();
  }
}
