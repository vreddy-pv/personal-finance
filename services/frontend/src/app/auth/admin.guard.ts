import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { StateService } from '../services/state.service';
import { User } from './user.model';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router, private stateService: StateService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.stateService.currentUser$.pipe(
      take(1),
      map(user => {
        if (this.authService.isLoggedIn() && user?.role === 'ADMIN') {
          return true;
        }
        this.router.navigate(['/']);
        return false;
      })
    );
  }
}
