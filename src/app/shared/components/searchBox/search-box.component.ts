import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchBoxComponent implements OnInit, OnChanges {

  searchValue = new FormControl(null);

  @Input()
  itemsForSearch: any[];
  @Input()
  searchBy: string;
  @Output()
  searchEvent = new EventEmitter<any[]>();
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.searchValue.valueChanges.pipe(
      distinctUntilChanged(),
      debounceTime(150)
    ).subscribe(
      (value) => this.filterItems(value)
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.filterItems();
  }

  private filterItems(value?: string): void {
    let filteredItems;
    if (value === '' || value === null || value === undefined) {
      filteredItems = this.itemsForSearch;
    } else {
      filteredItems = this.itemsForSearch.filter(item => item[this.searchBy].startsWith(value));
    }
    this.searchEvent.emit(filteredItems);
  }

}
