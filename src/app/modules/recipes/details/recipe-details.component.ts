import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DetailMode } from 'src/app/shared/models/detailMode';
import { IDetailStaticRouteData } from 'src/app/shared/models/i-detail-static-route-data';
import { map, mergeMap, take, tap } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import { of } from 'rxjs/internal/observable/of';
import { RecipeService } from '../services/recipe.service';
import { Recipe } from '../models/recipe.model';
import { DialogHelperService } from 'src/app/shared/services/dialog-helper.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { IDirtyComponent } from 'src/app/shared/models/i-dirty-component';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeDetailsComponent implements OnInit, IDirtyComponent {

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
    private router: Router,
    private dialogHelperService: DialogHelperService,
    private notificationService: NotificationService) { }

  checkIfDirty(): boolean {
    return this.recipeForm.dirty;
  }

  prepareMessageWhenDirty(): string | null {
    return null;
  }

  getFormControls(): any { return this.recipeForm.controls; }
  getIngredientsFormArray(): FormArray { return this.getFormControls().ingredients as FormArray; }

  ngOnInit(): void {
    this.createForm();
    this.activatedRoute.data
      .pipe(
        tap(() => this.setView(this.activatedRoute.snapshot?.data?.mode)),
        mergeMap(() => this.activatedRoute.params),
        this.parseParams(),
        this.throwIfParamIsNullOrEmpty(),
        mergeMap(id => {
          if (id) {
            return this.recipeService.getRecipe(id);
          } else {
            return of<Recipe>(null);
          }

        })
      ).subscribe(
        (data) => this.patchFormValues(data),
        (err) => console.error(err)
      );
  }

  setView(detailMode: DetailMode): void {
    this.viewType = detailMode;
    if (this.viewType === DetailMode.Edit) {
      this.title = 'Edit';
    } else if (this.viewType === DetailMode.View) {
      this.title = 'Details';
    } else {
      this.title = 'Add';
    }
  }

  private parseParams = () => map((params: Params): string => {
    if (params == null || params.id == null || params.id === '') {
      return null;
    }
    this.id = params.id;
    return params.id;
  })

  private throwIfParamIsNullOrEmpty = () => mergeMap((id: string) => {
    if ((id == null || id === '') && this.viewType !== DetailMode.Add) {
      return throwError(new Error('Brak wymaganego parametru'));
    }

    return of<string>(id);
  })

  private createForm(): void {
    this.recipeForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]),
      preparationTimeInMinutes: new FormControl([null, [Validators.required]]),
      description: new FormControl('', [Validators.required, Validators.minLength(15), Validators.maxLength(255)]),
      ingredients: new FormArray([

      ])
    });


  }

  private patchFormValues(data: Recipe): void {
    this.getIngredientsFormArray().controls = [];
    this.recipeForm.reset();
    this.recipeForm.markAsUntouched();
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
        }));
      });
    }

    this.changeStateOfRecipeForm();
    this.changeDetectorRef.detectChanges();
  }

  private changeStateOfRecipeForm(): void {
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

  goToEdit(): void {
    this.router.navigate(['edit', this.id]);
  }

  isLastIngredientIndex(i: number): boolean {
    if ((this.getIngredientsFormArray().controls.length - 1) === i) {
      return true;
    } else {
      return false;
    }
  }

  pushEmptyIngredient(): void {
    this.getIngredientsFormArray().push(this.formBuilder.group({
      name: [],
      quantity: []
    }));
  }

  addIngredientToRecipe(): void {
    this.pushEmptyIngredient();
  }

  removeIngredientFromRecipe(i: number): void {
    if (this.getIngredientsFormArray().controls.length < 4) {
      this.notificationService.info('Minimum 2 ingredients!');
    } else {
      this.getIngredientsFormArray().removeAt(i);
    }

  }

  saveChangedRecipe(): void {
    const recipe: Recipe = this.recipeForm.value;
    recipe.ingredients.pop();
    this.recipeService.editRecipe(recipe, this.id).subscribe(
      (res) => {
        this.recipeService.updateRecipesList();
        this.recipeForm.reset();
        this.recipeForm.markAsUntouched();
        this.router.navigate(['details', this.id]);
        this.notificationService.success('Edited recipe!');
      },
      (err) => this.notificationService.error('Failed edit recipe!')
    );
  }

  cancelEditRecipe(): void {
    this.router.navigate(['details', this.id]);
  }

  addRecipe(): void {
    const recipe: Recipe = this.recipeForm.value;
    recipe.ingredients.pop();
    this.recipeService.addRecipe(recipe).subscribe(
      (res) => {
        this.notificationService.success('Added recipe!');
        this.recipeService.updateRecipesList();
        this.recipeForm.reset();
        this.recipeForm.markAsUntouched();
        this.router.navigate(['details', res._id]);
      },
      (err) => this.notificationService.error('Failed adding recipe!'),
    );
  }

  removeRecipeFromList(): void {
    this.dialogHelperService.openDialogYesNo('Warning', 'Are you sure to delete this recipe?').subscribe(
      dialogResult => {
        if (dialogResult === true) {
          this.recipeService.deleteRecipe(this.id).subscribe(
            () => {
              this.notificationService.success('Removed recipe!');
              this.recipeService.updateRecipesList();
              this.router.navigate(['addRecipe']);
            },
            (err) => this.notificationService.error('Failed removing recipe')
          );
        }
      }
    );

  }
}
