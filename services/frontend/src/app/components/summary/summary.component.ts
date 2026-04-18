import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApiService } from '../../services/api';
import { StateService } from '../../services/state';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit, OnDestroy {
  totalIncome = 0;
  totalExpenses = 0;
  netBalance = 0;
  private destroy$ = new Subject<void>();

  constructor(private apiService: ApiService, private stateService: StateService) { }

  ngOnInit(): void {
    this.loadSummary();
    this.stateService.refreshTransactions$.pipe(takeUntil(this.destroy$)).subscribe(() => {
        this.loadSummary();
    });
  }

  ngOnDestroy() {
      this.destroy$.next();
      this.destroy$.complete();
  }

  loadSummary() {
    this.apiService.getSummary().subscribe(summary => {
      this.totalIncome = summary.totalIncome;
      this.totalExpenses = summary.totalExpenses;
      this.netBalance = summary.netBalance;
    });
  }
}
