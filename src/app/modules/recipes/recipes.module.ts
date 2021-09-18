import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipeDetailsComponent } from './details/recipe-details.component';
import { RecipesComponent } from './recipes.component';
import { ListComponent } from './list/list.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    RecipesComponent,
    RecipeDetailsComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RecipesRoutingModule
  ],
  providers: [

  ]
})
export class RecipesModule { }
