import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBox } from './components/searchBox/search-box-recipe.component';
import { DialogBodyComponent } from './components/dialog/dialog-body.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SearchBox,
    DialogBodyComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    SearchBox,
    DialogBodyComponent,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SharedModule { }
