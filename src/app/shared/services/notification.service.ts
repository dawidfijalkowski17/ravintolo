import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private snackBar: MatSnackBar) {
  }

  error(message: string): MatSnackBarRef<TextOnlySnackBar> {
    return this.snackBar.open(message, undefined, {
      panelClass: ['snackbar-error'],
      verticalPosition: 'top',
      horizontalPosition: 'center',
      duration: 1500
    });
  }

  success(message: string): MatSnackBarRef<TextOnlySnackBar> {
    return this.snackBar.open(message, undefined, {
      panelClass: ['snackbar-success'],
      verticalPosition: 'top',
      horizontalPosition: 'center',
      duration: 1500
    });
  }

  info(message: string): MatSnackBarRef<TextOnlySnackBar> {
    return this.snackBar.open(message, undefined, {
      panelClass: ['snackbar-info'],
      verticalPosition: 'top',
      horizontalPosition: 'center',
      duration: 1500
    });
  }
}

