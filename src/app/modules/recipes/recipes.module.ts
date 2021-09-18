import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipeDetailsComponent } from './details/recipe-details.component';
import { RecipesComponent } from './recipes.component';
import { ListComponent } from './list/list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MinutesToHoursPipe } from 'src/app/shared/pipes/minutes-to-hours.pipe';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    RecipesComponent,
    RecipeDetailsComponent,
    ListComponent,
    MinutesToHoursPipe
  ],
  imports: [
    CommonModule,
    SharedModule,
    RecipesRoutingModule,
    MatInputModule,
    MatIconModule
  ],
  providers: [

  ]
})
export class RecipesModule { }
