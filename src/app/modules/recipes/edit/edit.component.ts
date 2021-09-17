import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  recipeForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
    preparationTimeInMinutes: [0, [Validators.required]],
    description: ['', [Validators.required, Validators.minLength(15), Validators.maxLength(255)]],
    ingredients: new FormArray([])
  })

  ingredients = this.recipeForm.get('ingredients') as FormArray;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

}
