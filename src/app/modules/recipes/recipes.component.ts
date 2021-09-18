import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { Recipe } from './models/recipe.model';
import { RecipeService } from './services/recipe.service';


@Component({
    selector: 'app-recipes',
    templateUrl: './recipes.component.html',
    styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {

    recipesList: BehaviorSubject<Recipe[]>;
    filteredRecipesList: Recipe[] = [];

    constructor(private recipeService: RecipeService) {

    }

    ngOnInit(): void {
        this.watchForRecipeList();
    }

    watchForRecipeList(): void {
        this.recipesList = this.recipeService.recipeList;
        this.recipeService.updateRecipesList();
    }

    onFilterList(filteredItems: Recipe[]): void {
        this.filteredRecipesList = filteredItems;
    }

}
