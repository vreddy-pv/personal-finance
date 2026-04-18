import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../auth/user.model';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private readonly user$ = new BehaviorSubject<User | null>(null);

  public readonly currentUser$ = this.user$.asObservable();

  public setUser(user: User | null): void {
    this.user$.next(user);
  }
}
