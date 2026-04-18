import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { User } from '../auth/user.model';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  public currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();

  private refreshTransactionsSubject = new Subject<void>();
  public refreshTransactions$ = this.refreshTransactionsSubject.asObservable();

  constructor() { }

  setUser(user: User | null): void {
    this.currentUserSubject.next(user);
  }

  notifyTransactionListChanged(): void {
    this.refreshTransactionsSubject.next();
  }
}
