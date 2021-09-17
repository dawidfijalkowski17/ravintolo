import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailMode } from 'src/app/shared/models/detailMode';
import { IDetailStaticRouteData } from 'src/app/shared/models/iDetailStaticRouteData';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { RecipeDetailsComponent } from './details/recipe-details.component';
import { EditComponent } from './edit/edit.component';
import { RecipesComponent } from './recipes.component';

const routes: Routes = [
  {
    path: '', component: RecipesComponent, children: [
      { path: 'details/:id', component: RecipeDetailsComponent, data: { mode: DetailMode.View } as IDetailStaticRouteData },
      { path: 'edit/:id', component: RecipeDetailsComponent, data: { mode: DetailMode.Edit } as IDetailStaticRouteData },
      { path: 'addRecipe', component: RecipeDetailsComponent, data: { mode: DetailMode.Add } as IDetailStaticRouteData }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule { }
