import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { StateService } from '../services/state.service';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8080/api/auth';
  private token$ = new BehaviorSubject<string | null>(null);
  private readonly USER_KEY = 'currentUser';

  constructor(private http: HttpClient, private stateService: StateService) {
    this.initUser();
   }

   private initUser(): void {
    const user = this.getUserFromStorage();
    const token = localStorage.getItem('token');
    if (user && token) {
      this.stateService.setUser(user);
      this.token$.next(token);
    }
  }

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/authenticate`, credentials).pipe(
      tap((response) => {
        this.handleAuthResponse(response);
      })
    );
  }

  register(userInfo: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, userInfo).pipe(
      tap((response) => {
        this.handleAuthResponse(response);
      })
    );
  }

  private handleAuthResponse(response: any): void {
    if (response?.token) {
      localStorage.setItem('token', response.token);
      this.token$.next(response.token);
      const user: User = {
          id: response.id,
          username: response.username,
          email: response.email,
          role: response.role
      };
      this.setUserInStorage(user);
      this.stateService.setUser(user);
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.token$.next(null);
    localStorage.removeItem(this.USER_KEY);
    this.stateService.setUser(null);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    return this.token$.getValue();
  }

  private setUserInStorage(user: User): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
}

private getUserFromStorage(): User | null {
    const userJson = localStorage.getItem(this.USER_KEY);
    return userJson ? JSON.parse(userJson) : null;
}
}
