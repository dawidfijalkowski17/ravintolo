import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs/internal/Observable';
import { DialogBodyComponent } from '../components/dialog/dialog-body.component';

@Injectable({
  providedIn: 'root'
})
export class DialogHelperService {

  constructor(public dialog: MatDialog) { }


  openInformationDialog(title: string, message: string): void {
    this.dialog.open(DialogBodyComponent, {
      maxWidth: '600px',
      data: {
        title,
        message,
        yesNo: false
      }
    });
  }

  openDialogYesNo(title: string, message: string): Observable<any> {
    const dialogRef = this.dialog.open(DialogBodyComponent, {
      maxWidth: '600px',
      data: {
        title,
        message,
        yesNo: true
      }
    });

    return dialogRef.afterClosed();
  }

}
