import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { DialogBodyComponent } from './shared/components/dialog/dialog-body.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'Ravintolo';


  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    this.dialog.open(DialogBodyComponent, dialogConfig);
  }


}
