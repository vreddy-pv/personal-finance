
import { Component, OnDestroy, OnInit } from '@angular/core';
import { SummaryComponent } from '../summary/summary.component';
import { ApiService } from '../../services/api';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { StateService } from '../../services/state';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AddTransactionDialogComponent } from '../add-transaction-dialog/add-transaction-dialog';
import { MatCardModule } from '@angular/material/card';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SummaryComponent, CommonModule, MatTableModule, MatIconModule, MatButtonModule, MatCardModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit, OnDestroy {

  transactions: any[] = [];
  displayedColumns: string[] = ['date', 'description', 'amount', 'category', 'actions'];
  private destroy$ = new Subject<void>();

  constructor(
    private apiService: ApiService,
    private stateService: StateService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.loadTransactions();
    this.stateService.refreshTransactions$.pipe(takeUntil(this.destroy$)).subscribe(() => {
        this.loadTransactions();
    });
  }

  ngOnDestroy() {
      this.destroy$.next();
      this.destroy$.complete();
  }

  loadTransactions() {
    this.apiService.getAllTransactions().subscribe(data => {
      this.transactions = data;
    });
  }

  deleteTransaction(id: number) {
    this.apiService.deleteTransaction(id).subscribe(() => {
      this.stateService.notifyTransactionListChanged();
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
}
