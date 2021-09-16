import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Recipe } from './models/recipe.model';
import { RecipeService } from './services/recipe.service';


@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipesComponent implements OnInit {

  recipeList: Recipe[] = [];

  constructor(private recipeService: RecipeService, private changeDetectorRef: ChangeDetectorRef) { 
    
  }

  ngOnInit(): void {
    this.getRecipesList();
  }

  getRecipesList(){
    this.recipeService.getRecipesList().subscribe((res)=>{
      this.recipeList = res;
      this.changeDetectorRef.detectChanges();
    });
  }
  

}
