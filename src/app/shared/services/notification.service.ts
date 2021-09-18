import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private snackBar: MatSnackBar) {
  }

  error(message: string) {
    return this.snackBar.open(message, undefined, { panelClass: ['snackbar-error'], verticalPosition: 'top', horizontalPosition: 'center', duration: 1500 });
  }

  success(message: string) {
    return this.snackBar.open(message, undefined, { panelClass: ['snackbar-success'], verticalPosition: 'top', horizontalPosition: 'center', duration: 1500 });
  }

  info(message: string) {
    return this.snackBar.open(message, undefined, { panelClass: ['snackbar-info'], verticalPosition: 'top', horizontalPosition: 'center', duration: 1500 });
  }
}

