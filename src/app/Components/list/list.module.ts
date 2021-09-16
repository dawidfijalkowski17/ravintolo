import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListRoutingModule } from './list-routing.module';
import { ListComponent } from './list.component';
import { ListDetailsComponent } from './list-details/list-details.component';
import { environment } from '../../../environments/environment';
import { API_BASE_URL } from './Services/recipe.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
     ListComponent,
     ListDetailsComponent
    ],
  imports: [
    CommonModule,
    ListRoutingModule

  ],
  providers: [
    
  ]
})
export class ListModule { }
