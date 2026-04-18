import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddTransactionDialogComponent } from '../components/add-transaction-dialog/add-transaction-dialog';
import { StateService } from '../services/state.service';
import { Observable } from 'rxjs';
import { User } from '../auth/user.model';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-toolbar',
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, MatDialogModule, CommonModule, MatMenuModule],
  templateUrl: './toolbar.html',
  styleUrls: ['./toolbar.scss'],
  standalone: true,
})
export class ToolbarComponent implements OnInit {
  currentUser$!: Observable<User | null>;

  constructor(public dialog: MatDialog, private stateService: StateService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.currentUser$ = this.stateService.currentUser$;
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
}
