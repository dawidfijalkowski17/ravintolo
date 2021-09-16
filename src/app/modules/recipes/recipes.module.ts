import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesRoutingModule } from './recipes-routing.module';
import { ListDetailsComponent } from './details/list-details.component';
import { RecipesComponent } from './recipes.component';


@NgModule({
  declarations: [
     RecipesComponent,
     ListDetailsComponent
    ],
  imports: [
    CommonModule,
    RecipesRoutingModule
  ],
  providers: [
    
  ]
})
export class RecipesModule { }
