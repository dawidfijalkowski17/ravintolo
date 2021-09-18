import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, SimpleChange } from '@angular/core';
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

  constructor(private recipeService: RecipeService, private changeDetectorRef: ChangeDetectorRef) {

  }

  ngOnInit(): void {

  }

  deleteOneRecipe(id: string) {
    this.recipeService.deleteRecipe(id).subscribe(
      () => this.recipeService.updateRecipesList()
    )
  }
}
