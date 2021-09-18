import { Ingredient } from './ingredients.model';

export interface Recipe {
    _id?: string;
    name: string;
    preparationTimeInMinutes: number;
    description: string;
    ingredients: Array<Ingredient>;
}
