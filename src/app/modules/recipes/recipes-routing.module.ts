import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DirtyComponentGuard } from 'src/app/shared/guards/dirty-component.guard';
import { DetailMode } from 'src/app/shared/models/detailMode';
import { IDetailStaticRouteData } from 'src/app/shared/models/i-detail-static-route-data';
import { RecipeDetailsComponent } from './details/recipe-details.component';
import { RecipesComponent } from './recipes.component';

const routes: Routes = [
  {
    path: '', component: RecipesComponent, children: [
      {
        path: 'details/:id', component: RecipeDetailsComponent,
        data: { mode: DetailMode.View } as IDetailStaticRouteData
      },
      {
        path: 'edit/:id', component: RecipeDetailsComponent,
        data: { mode: DetailMode.Edit } as IDetailStaticRouteData,
        canDeactivate: [DirtyComponentGuard]
      },
      {
        path: 'addRecipe', component: RecipeDetailsComponent,
        data: { mode: DetailMode.Add } as IDetailStaticRouteData,
        canDeactivate: [DirtyComponentGuard]
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule { }
