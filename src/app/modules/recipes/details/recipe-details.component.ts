import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { DetailMode } from 'src/app/shared/models/detailMode';
import { IDetailStaticRouteData } from 'src/app/shared/models/iDetailStaticRouteData';
import { map, mergeMap, tap } from 'rxjs/operators';
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
  selectedRecipe: Recipe[] = [];

  recipeForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
    preparationTimeInMinutes: [0, [Validators.required]],
    description: ['', [Validators.required, Validators.minLength(15), Validators.maxLength(255)]],
    ingredients: this.formBuilder.group({
      name: ['', Validators.required, Validators.minLength(3)],
      quantity: [0, Validators.required],
      mark: ['', Validators.required]
    })
  })

  ingredients = this.recipeForm.get('ingredients') as FormArray;

  constructor(private formBuilder: FormBuilder, private readonly activatedRoute: ActivatedRoute, private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.activatedRoute.data
      .pipe(
        tap(() => this.setView(this.activatedRoute.snapshot.data['mode'])),
        //mergeMap((params) => this.initFormData(params.get('id'))),
        mergeMap(() => this.activatedRoute.params),
        this.parseParams(),
        this.throwIfParamIsNullOrEmpty(),
        mergeMap(id => this.recipeService.getRecipe(id))
      ).subscribe(
        (res) => console.log(res)
      );
    console.log(this.viewType)
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

    return params['id'];
  })

  private throwIfParamIsNullOrEmpty = () => mergeMap((id: string) => {
    if (id == null || id === '') {
      return throwError(new Error('Brak wymaganego parametru'));
    }

    return of<string>(id);
  })
}
