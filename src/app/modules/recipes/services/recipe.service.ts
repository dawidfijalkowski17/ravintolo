import { Inject, Injectable, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../models/recipe.model';
import { BehaviorSubject, Observable } from 'rxjs';


export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private baseUrl: string;
  recipeList: BehaviorSubject<Recipe[]> = new BehaviorSubject<Recipe[]>([]);

  constructor(private http: HttpClient, @Inject(API_BASE_URL) baseUrl?: string) {
    this.baseUrl = baseUrl ? baseUrl : "";
  }


  updateRecipesList() {
    return this.http.get<Recipe[]>(`${this.baseUrl}/recipe`).subscribe(
      data => this.recipeList.next(data)
    )
  }

  deleteRecipe(id: string) {
    return this.http.delete(`${this.baseUrl}/recipe/${id}`);
  }

  getRecipe(id: string): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.baseUrl}/recipe/${id}`);
  }

  editRecipe(data: Recipe, id: string) {
    return this.http.put(`${this.baseUrl}/recipe/${id}`, data);
  }

  addRecipe(data: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(`${this.baseUrl}/recipe/`, data);
  }
}


