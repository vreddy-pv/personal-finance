import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddTransactionDialogComponent } from '../add-transaction-dialog/add-transaction-dialog';
import { StateService } from '../../services/state.service';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../auth/user.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { VRGT_LOGOS, VRGT_BRANDING } from '../../shared/constants/branding.constants';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.html',
  styleUrls: ['./sidenav.scss'],
  standalone: true,
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule,
    MatTooltipModule,
    RouterModule,
    MatListModule,
    MatDialogModule,
    CommonModule
  ],
})
export class SidenavComponent {
  user: User | null = null;
  isAdmin = false;
  logoFailed = false;

  // VRGT Branding
  vrgtLogo = VRGT_LOGOS.horizontal;
  appTitle = VRGT_BRANDING.appTitle;

  constructor(
    public dialog: MatDialog,
    private stateService: StateService,
    private authService: AuthService,
    private router: Router
  ) {
    this.stateService.currentUser$.subscribe(user => {
      this.user = user;
      this.isAdmin = user?.role === 'ADMIN';
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddTransactionDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  onLogoError(): void {
    console.warn('Failed to load VRGT logo from:', this.vrgtLogo);
    this.logoFailed = true;
  }
}
