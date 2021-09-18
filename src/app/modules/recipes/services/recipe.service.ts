import { Inject, Injectable, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../models/recipe.model';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';


export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private baseUrl: string;
  recipeList: BehaviorSubject<Recipe[]> = new BehaviorSubject<Recipe[]>([]);

  constructor(private http: HttpClient, @Inject(API_BASE_URL) baseUrl?: string) {
    this.baseUrl = baseUrl ? baseUrl : '';
    this.refreshStorageWatcher();

  }


  updateRecipesList(): Subscription {
    return this.http.get<Recipe[]>(`${this.baseUrl}/recipe`).subscribe(
      data => {
        this.saveDataToStorage(data);
        this.recipeList.next(data);
      }
    );
  }

  deleteRecipe(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/recipe/${id}`);
  }

  getRecipe(id: string): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.baseUrl}/recipe/${id}`);
  }

  editRecipe(data: Recipe, id: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/recipe/${id}`, data);
  }

  addRecipe(data: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(`${this.baseUrl}/recipe/`, data);
  }

  saveDataToStorage(data: Recipe[]): void {
    localStorage.setItem('recipesList', JSON.stringify(data));
  }

  refreshStorageWatcher(): void {
    setInterval(() => {
      localStorage.removeItem('recipesList');
      this.updateRecipesList();
    }, environment.cacheTimer);
  }
}


