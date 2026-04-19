import { Routes } from '@angular/router';
import { SidenavComponent } from './components/sidenav/sidenav';
import { Dashboard } from './components/dashboard/dashboard';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { AdminGuard } from './auth/admin.guard';
import { AdminDashboard } from './components/admin/admin.component';

export const routes: Routes = [
  {
    path: '',
    component: SidenavComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: Dashboard },
      { path: 'admin', component: AdminDashboard, canActivate: [AdminGuard] }
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  { path: 'transactions', redirectTo: '', pathMatch: 'full' },
  { path: '**', redirectTo: '' },
];
