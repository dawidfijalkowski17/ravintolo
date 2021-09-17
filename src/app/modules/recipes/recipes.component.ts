import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Recipe } from './models/recipe.model';
import { RecipeService } from './services/recipe.service';


@Component({
    selector: 'app-recipes',
    templateUrl: './recipes.component.html',
    styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {

    recipesList: Observable<Recipe[]>;

    constructor(private recipeService: RecipeService) {

    }

    ngOnInit(): void {
        this.getRecipesList();
    }

    getRecipesList() {
        this.recipesList = this.recipeService.getRecipesList();
    }

}
