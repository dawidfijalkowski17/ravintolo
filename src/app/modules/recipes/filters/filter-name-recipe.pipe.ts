import { Pipe, PipeTransform } from '@angular/core';
import { Recipe } from '../models/recipe.model';

@Pipe({
  name: 'filterNameRecipe',
  pure: false
})
export class FilterNameRecipePipe implements PipeTransform {

  transform(value: Recipe[], searchValue: string): any {

    return value.filter((i) => {
      return i.name.toLocaleLowerCase().startsWith(searchValue.toLocaleLowerCase())
    });
  }

}
