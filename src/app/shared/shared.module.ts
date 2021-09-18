import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBox } from './components/searchBox/search-box.component';
import { DialogBodyComponent } from './components/dialog/dialog-body.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogHelperService } from './services/dialog-helper.service';
import { MatCardModule } from '@angular/material/card';



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
  ],
  entryComponents: [DialogBodyComponent],
  providers: [DialogHelperService]
})
export class SharedModule { }
