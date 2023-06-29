import { Component, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { Trip } from 'src/trips/models/Trip';
import { TripsService } from 'src/trips/services/trips.service';
import { FormComponent } from '../form/form.component';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  //i use this to be able to apply a style for openModal
  encapsulation: ViewEncapsulation.None,
})
export class TableComponent {
  data$: Observable<Trip[]>;
  sortedData: Trip[] = [];

  constructor(
    private tripsService: TripsService,
    private modalService: NzModalService
  ) {
    this.data$ = this.tripsService.getTrips();
    this.data$.subscribe((data) => {
      this.sortedData = data;
    });
  }

  editItem(trip: Trip): void {
    const modal = this.modalService.create({
      nzTitle: 'Edit Trip',
      nzContent: FormComponent,
      // send the value of the selected trip to the child(form component)
      nzComponentParams: {
        trip: trip,
      },
      nzFooter: [
        {
          label: 'Save',
          onClick: (componentInstance: FormComponent) => {
            componentInstance.editTrip();
            modal.destroy();
          },
        },
        {
          label: 'Cancel',
          onClick: () => {
            modal.destroy();
          },
        },
      ],
    });
  }

  addItem(): void {
    const modal = this.modalService.create({
      nzTitle: 'Add Trip',
      nzContent: FormComponent,
      nzFooter: [
        {
          label: 'Save',
          onClick: (componentInstance: FormComponent) => {
            componentInstance.addTrip();
            modal.destroy();
            
          },
        },
        {
          label: 'Cancel',
          onClick: () => {
            modal.destroy();
          },
        },
      ],
    });
  }


  openModal(item: Trip): void {
    const modal = this.modalService.create({
      nzTitle: 'Trip Details',
      nzContent: `
        <div>
          <h3>Description:</h3>
          <p>${item.beginning} -> ${item.destination}</p>
         
          <div class="modal-image-container">
          <img src="${item.image}" alt="Item Image" />
        </div>

        </div>
      `,
      nzFooter: null,
    });
  }

  deleteItem(item: Trip) {
    this.tripsService.deleteTrip(item.id);
  }

  onSearch(searchTrip: string): void {
    this.data$ = this.tripsService.searchTrips(searchTrip);
    this.data$.subscribe((data) => {
      this.sortedData = data;
    });
  }

  //sorting the table using the difference
  sortTable(column: string): void {
    this.data$.subscribe((trips) => {
      this.sortedData = trips.slice().sort((a, b) => {
        const valueA = a[column];
        const valueB = b[column];

        return valueA - valueB;
      });
    });
  }
}
