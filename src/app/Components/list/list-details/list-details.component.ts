import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RecipeService } from '../Services/recipe.service';

@Component({
  selector: 'app-list-details',
  templateUrl: './list-details.component.html',
  styleUrls: ['./list-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListDetailsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
   
  }

}
