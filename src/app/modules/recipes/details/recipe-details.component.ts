import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DetailMode } from 'src/app/shared/models/detailMode';
import { IDetailStaticRouteData } from 'src/app/shared/models/iDetailStaticRouteData';
import { map, mergeMap, take, tap } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import { of } from 'rxjs/internal/observable/of';
import { RecipeService } from '../services/recipe.service';
import { Recipe } from '../models/recipe.model';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeDetailsComponent implements OnInit {

  viewType: DetailMode;
  id: string;
  title: string;
  selectedRecipe: Recipe;
  recipeForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private readonly activatedRoute: ActivatedRoute,
    private recipeService: RecipeService,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router) { }

  getFormControls() { return this.recipeForm.controls }
  getIngredientsFormArray() { return this.getFormControls().ingredients as FormArray }

  ngOnInit(): void {
    this.createForm();
    this.activatedRoute.data
      .pipe(
        tap(() => this.setView(this.activatedRoute.snapshot.data['mode'])),
        mergeMap(() => this.activatedRoute.params),
        this.parseParams(),
        this.throwIfParamIsNullOrEmpty(),
        mergeMap(id => {
          if (id) {
            return this.recipeService.getRecipe(id);
          } else {
            return of<Recipe>(null);;
          }

        })
      ).subscribe(
        (data) => this.patchFormValues(data),
        (err) => console.error(err),
        () => console.log('FINISHH!!!!!!')
      );
  }

  setView(detailMode: DetailMode): void {
    this.viewType = detailMode;
    if (this.viewType === DetailMode.Edit) {
      this.title = 'Edycja';
    } else if (this.viewType === DetailMode.View) {
      this.title = 'Podgląd';
    } else {
      this.title = 'Dodaj';
    }
  }

  private parseParams = () => map((params: Params): string => {
    if (params == null || params['id'] == null || params['id'] === '') {
      return null;
    }
    this.id = params['id'];
    return params['id'];
  })

  private throwIfParamIsNullOrEmpty = () => mergeMap((id: string) => {
    if ((id == null || id === '') && this.viewType !== DetailMode.Add) {
      return throwError(new Error('Brak wymaganego parametru'));
    }

    return of<string>(id);
  })

  private createForm() {
    this.recipeForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]),
      preparationTimeInMinutes: new FormControl([null, [Validators.required]]),
      description: new FormControl('', [Validators.required, Validators.minLength(15), Validators.maxLength(255)]),
      ingredients: new FormArray([

      ])
    });


  }

  private patchFormValues(data: Recipe) {
    if (this.viewType === DetailMode.Edit || this.viewType === DetailMode.View) {
      this.recipeForm.patchValue({
        name: data.name,
        preparationTimeInMinutes: data.preparationTimeInMinutes,
        description: data.description
      });
      data.ingredients.forEach(ingredient => {
        this.getIngredientsFormArray().push(this.formBuilder.group({
          name: [ingredient.name],
          quantity: [ingredient.quantity]
        }))
      });
    }

    this.changeStateOfRecipeForm();
    this.changeDetectorRef.detectChanges();
  }

  private changeStateOfRecipeForm() {
    switch (this.viewType) {

      case DetailMode.Add:
        this.recipeForm.enable();
        this.pushEmptyIngredient();
        this.pushEmptyIngredient();
        this.pushEmptyIngredient();
        break;

      case DetailMode.Edit:
        this.recipeForm.enable();
        this.pushEmptyIngredient();
        break;

      case DetailMode.View:
        this.recipeForm.disable();
        break;
    }
  }

  goToEdit() {
    this.router.navigate(['edit', this.id])
  }

  isLastIngredientIndex(i: number): boolean {
    if ((this.getIngredientsFormArray().controls.length - 1) == i) {
      return true;
    } else return false;
  }

  pushEmptyIngredient() {
    this.getIngredientsFormArray().push(this.formBuilder.group({
      name: [],
      quantity: []
    }));
  }

  addIngredientToRecipe() {
    this.pushEmptyIngredient();
  }

  removeIngredientFromRecipe(i: number) {
    this.getIngredientsFormArray().removeAt(i);
  }

  saveChangedRecipe() {
    const recipe: Recipe = this.recipeForm.value;
    recipe.ingredients.pop();
    this.recipeService.editRecipe(recipe, this.id).subscribe(
      (res) => this.router.navigate(['details', this.id]),
      (err) => console.error(err)
    )
  }

  cancelEditRecipe() {
    this.router.navigate(['details', this.id])
  }

  addRecipe() {
    const recipe: Recipe = this.recipeForm.value;
    recipe.ingredients.pop();
    this.recipeService.addRecipe(recipe).subscribe(
      (res) => {
        this.recipeService.updateRecipesList();
        this.router.navigate(['details', res._id])
      },
      (err) => console.error(err),
    )
  }

  removeRecipeFromList() {
    this.recipeService.deleteRecipe(this.id).subscribe(
      () => {
        this.recipeService.updateRecipesList();
        this.router.navigate(['addRecipe']);
      }
    );
  }
}
