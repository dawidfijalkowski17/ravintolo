import { Inject, Injectable, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';


export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private baseUrl: string;

  constructor(private http: HttpClient, @Inject(API_BASE_URL) baseUrl?: string) {
       this.baseUrl = baseUrl ? baseUrl : ""; 
        }



}


