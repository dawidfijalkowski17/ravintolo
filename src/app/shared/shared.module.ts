import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBoxComponent } from './components/searchBox/search-box.component';
import { DialogBodyComponent } from './components/dialog/dialog-body.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogHelperService } from './services/dialog-helper.service';




@NgModule({
  declarations: [
    SearchBoxComponent,
    DialogBodyComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    SearchBoxComponent,
    DialogBodyComponent,
    ReactiveFormsModule,
    FormsModule
  ],
  entryComponents: [DialogBodyComponent],
  providers: [DialogHelperService]
})
export class SharedModule { }
