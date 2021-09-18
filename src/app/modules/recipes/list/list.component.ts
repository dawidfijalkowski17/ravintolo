import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, SimpleChange } from '@angular/core';
import { Router } from '@angular/router';
import { DialogHelperService } from 'src/app/shared/services/dialog-helper.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { Recipe } from '../models/recipe.model';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit {

  @Input()
  recipesList: Recipe[] = []

  constructor(
    private recipeService: RecipeService,
    private changeDetectorRef: ChangeDetectorRef,
    private dialogHelperService: DialogHelperService,
    private router: Router,
    private notificationService: NotificationService) {

  }

  ngOnInit(): void {

  }

  deleteOneRecipe(id: string) {
    this.dialogHelperService.openDialogYesNo('Warning', 'Are you sure to delete this recipe?').subscribe(
      dialogResult => {
        if (dialogResult === true) {
          this.recipeService.deleteRecipe(id).subscribe(
            () => {
              this.notificationService.success('Removed recipe!');
              this.recipeService.updateRecipesList();
              this.router.navigate(['addRecipe']);
            },
            (err) => this.notificationService.error('Failed removind recipe')
          );
        }
      }
    )

  }
}
