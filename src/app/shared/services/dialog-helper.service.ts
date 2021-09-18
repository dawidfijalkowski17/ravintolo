import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogBodyComponent } from '../components/dialog/dialog-body.component';

@Injectable({
  providedIn: 'root'
})
export class DialogHelperService {

  constructor(public dialog: MatDialog) { }


  openInformationDialog(title: string, message: string) {

    this.dialog.open(DialogBodyComponent, {
      maxWidth: "600px",
      data: {
        title: title,
        message: message,
        yesNo: false
      }
    });
  }

  openDialogYesNo(title: string, message: string) {
    const dialogRef = this.dialog.open(DialogBodyComponent, {
      maxWidth: "600px",
      data: {
        title: title,
        message: message,
        yesNo: true
      }
    })

    return dialogRef.afterClosed();
  }

}
