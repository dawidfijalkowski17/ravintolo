import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogBodyComponent } from './shared/components/dialog/dialog-body.component';
import { DialogHelperService } from './shared/services/dialog-helper.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'Ravintolo';


  constructor(private dialogHelperService: DialogHelperService) { }

  openDialog(): void {
    this.dialogHelperService.openInformationDialog('Author Information', 'Dawid Fijałkowski');
  }


}
