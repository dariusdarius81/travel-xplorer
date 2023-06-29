import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  @Output() search: EventEmitter<string> = new EventEmitter<string>();
  searchTrip: string = '';
  
  //emit the value to the table
  onSearch(): void {
    this.search.emit(this.searchTrip);
  }
}
