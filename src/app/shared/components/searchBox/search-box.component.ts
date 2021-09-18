import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchBox implements OnInit {

  searchValue = new FormControl(null);

  @Input()
  itemsForSearch: any[];
  @Input()
  searchBy: string;
  @Output()
  onSearchEvent = new EventEmitter<any[]>();
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.searchValue.valueChanges.subscribe(
      (value) => this.filterItems(value)
    )
  }

  ngOnChanges(changes: SimpleChanges) {
    this.filterItems();
  }

  private filterItems(value?: string) {
    let filteredItems;
    if (value === '' || value === null || value === undefined) {
      filteredItems = this.itemsForSearch;
    } else {
      filteredItems = this.itemsForSearch.filter(item => item[this.searchBy].startsWith(value));
    }
    this.onSearchEvent.emit(filteredItems);
  }

}
