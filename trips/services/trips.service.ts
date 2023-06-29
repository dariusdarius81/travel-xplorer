import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Trip } from '../models/Trip';

@Injectable({
  providedIn: 'root',
})
export class TripsService {
  private tripsSubject: BehaviorSubject<Trip[]> = new BehaviorSubject<Trip[]>([]);
  trips$: Observable<Trip[]> = this.tripsSubject.asObservable();

  constructor() {
    this.loadInitialData();
  }

  private loadInitialData(): void {
    const storedTrips = localStorage.getItem('trips');
    if (storedTrips) {
      this.tripsSubject.next(JSON.parse(storedTrips));
    } else {
      const initialTrips: Trip[] = [
        {
          id: 1,
          beginning: 'City A',
          destination: 'City B',
          distance: 100,
          time: 2,
          difficulty: 'medium',
          rating: 3,
          image: 'https://muntii-nostri.ro/sites/default/files/styles/gallery_image_single/public/_1MN_img_Turnurile_Tiganesti_-_21.jpg?itok=0tEpTsSc',
        },
        {
          id: 2,
          beginning: 'City B',
          destination: 'City C',
          distance: 150,
          time: 3,
          difficulty: 'easy',
          rating: 5,
        },
        {
          id: 3,
          beginning: 'City C',
          destination: 'City D',
          distance: 200,
          time: 4,
          difficulty: 'hard',
          rating: 4,
        },
      ];

      this.tripsSubject.next(initialTrips);
      this.saveTripsToLocalStorage(initialTrips);
    }
  }

  getTrips(): Observable<Trip[]> {
    return this.trips$;
  }

  addTrip(trip: Trip): void {
    const currentData = this.tripsSubject.getValue();
    const newId = currentData.length > 0 ? Math.max(...currentData.map(trip => trip.id)) + 1 : 1;
    const newTrip = { ...trip, id: newId };
    const updatedData = [...currentData, newTrip];
    this.tripsSubject.next(updatedData);
    this.saveTripsToLocalStorage(updatedData);
  }

  editTrip(updatedTrip: Trip): void {
    const currentData = this.tripsSubject.getValue();
    const updatedData = currentData.map((item) => {
      if (item.id === updatedTrip.id) {
        console.log('a intrat');
        return { ...item, ...updatedTrip };
      }
      return item;
    });
    this.tripsSubject.next(updatedData);
    this.saveTripsToLocalStorage(updatedData);
  }

  deleteTrip(tripId: number): void {
    const trips = this.tripsSubject.value;
    const filteredTrips = trips.filter((trip) => trip.id !== tripId);
    this.tripsSubject.next(filteredTrips);
    this.saveTripsToLocalStorage(filteredTrips);
  }

  //filter the array according to the letters in the beginning member
  searchTrips(searchTrip: string): Observable<Trip[]> {
    return this.trips$.pipe(
      map((trips) => {
        return trips.filter((trip) =>
          trip.beginning.toLowerCase().includes(searchTrip.toLowerCase())
        );
      })
    );
  }

  private saveTripsToLocalStorage(trips: Trip[]): void {
    localStorage.setItem('trips', JSON.stringify(trips));
  }
}
