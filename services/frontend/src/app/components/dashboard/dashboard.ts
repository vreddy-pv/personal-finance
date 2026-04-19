
import { Component, OnDestroy, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { SummaryComponent } from '../summary/summary.component';
import { ApiService } from '../../services/api';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { StateService } from '../../services/state';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AddTransactionDialogComponent } from '../add-transaction-dialog/add-transaction-dialog';
import { MatCardModule } from '@angular/material/card';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  template: `
    <h2 mat-dialog-title>Confirm</h2>
    <mat-dialog-content>{{ data.message }}</mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button [mat-dialog-close]="false">Cancel</button>
      <button mat-raised-button color="warn" [mat-dialog-close]="true">Delete</button>
    </mat-dialog-actions>
  `,
  standalone: true,
  imports: [MatButtonModule, MatDialogModule]
})
export class ConfirmDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    SummaryComponent,
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatDialogModule,
    ConfirmDialogComponent
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit, OnDestroy {

  transactions: any[] = [];
  datasource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['date', 'description', 'amount', 'category', 'actions'];
  filterValue = '';
  private destroy$ = new Subject<void>();

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(
    private apiService: ApiService,
    private stateService: StateService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.stateService.refreshTransactions$.pipe(takeUntil(this.destroy$)).subscribe(() => {
        this.loadTransactions();
    });
  }

  ngAfterViewInit(): void {
    this.datasource.sort = this.sort;
    this.datasource.paginator = this.paginator;
    this.loadTransactions();
  }

  ngOnDestroy() {
      this.destroy$.next();
      this.destroy$.complete();
  }

  loadTransactions() {
    this.apiService.getAllTransactions().subscribe(data => {
      this.transactions = data;
      this.datasource.data = data;
      this.cdr.detectChanges();
    });
  }

  applyFilter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterValue = filterValue.trim().toLowerCase();
    this.datasource.filter = this.filterValue;

    if (this.datasource.paginator) {
      this.datasource.paginator.firstPage();
    }
  }

  clearFilter() {
    this.filterValue = '';
    this.datasource.filter = '';
  }

  deleteTransaction(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: { message: 'Are you sure you want to delete this transaction?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.apiService.deleteTransaction(id).subscribe(() => {
          this.snackBar.open('Transaction deleted', 'Close', { duration: 3000 });
          this.stateService.notifyTransactionListChanged();
        });
      }
    });
  }

  editTransaction(transaction: any) {
    this.dialog.open(AddTransactionDialogComponent, {
      width: '600px',
      data: transaction,
    });
  }

  openDialog() {
    this.dialog.open(AddTransactionDialogComponent, {
      width: '600px',
    });
  }

  getTransactionType(amount: number): string {
    return amount > 0 ? 'income' : 'expense';
  }
}
