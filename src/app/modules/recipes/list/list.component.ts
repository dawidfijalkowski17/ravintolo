import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, SimpleChange } from '@angular/core';
import { Router } from '@angular/router';
import { DialogHelperService } from 'src/app/shared/services/dialog-helper.service';
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

  constructor(private recipeService: RecipeService, private changeDetectorRef: ChangeDetectorRef, private dialogHelperService: DialogHelperService, private router: Router) {

  }

  ngOnInit(): void {

  }

  deleteOneRecipe(id: string) {
    this.dialogHelperService.openDialogYesNo('Warning', 'Are you sure to delete this recipe?').subscribe(
      dialogResult => {
        if (dialogResult === true) {
          this.recipeService.deleteRecipe(id).subscribe(
            () => {
              this.recipeService.updateRecipesList();
              this.router.navigate(['addRecipe']);
            }
          );
        }
      }
    )

  }
}
