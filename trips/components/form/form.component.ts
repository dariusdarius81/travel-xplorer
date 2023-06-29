import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Trip } from 'src/trips/models/Trip';
import { TripsService } from 'src/trips/services/trips.service';
import { numberValidator } from 'src/trips/validators/NumberValidator';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  @Input() trip: Trip | undefined;
  tripForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private tripsService: TripsService,
    private notification: NzNotificationService
  ) {
    this.tripForm = this.fb.group({
      beginning: ['', [Validators.required]],
      destination: ['', [Validators.required]],
      distance: [0, [Validators.required, Validators.min(1),numberValidator()]],
      time: [0, [Validators.required, Validators.max(23),numberValidator()]],
      difficulty: ['', [Validators.required]],
      rating: [0, [Validators.required, Validators.max(4),numberValidator()]],
    });
  }

  ngOnInit() {
    if (this.trip) {
     
      this.tripForm.setValue({
        beginning: this.trip.beginning,
        destination: this.trip.destination,
        distance: this.trip.distance,
        time: this.trip.time,
        difficulty: this.trip.difficulty,
        rating: this.trip.rating,
      });
    }

  }

  editTrip() {
    if (this.tripForm.valid) {
      const trip: Trip = {
        id: this.trip.id,
        beginning: this.tripForm.get('beginning').value,
        destination: this.tripForm.get('destination').value,
        distance: this.tripForm.get('distance').value,
        time: this.tripForm.get('time').value,
        difficulty: this.tripForm.get('difficulty').value,
        rating: this.tripForm.get('rating').value,
      };

      this.tripsService.editTrip(trip);
      this.notification.success('Success', 'Trip updated successfully.');
    } else {
      this.notification.error('Error', 'Please insert the data correctly.');
    }
  }

  addTrip() {
    if (this.tripForm.valid) {
      const trip: Trip = {
        beginning: this.tripForm.get('beginning').value,
        destination: this.tripForm.get('destination').value,
        distance: this.tripForm.get('distance').value,
        time: this.tripForm.get('time').value,
        difficulty: this.tripForm.get('difficulty').value,
        rating: this.tripForm.get('rating').value,
      };

      this.tripsService.addTrip(trip);
    }
  }

  isFormControlInvalid(controlName: string): boolean {
    const control = this.tripForm.get(controlName);
    return control?.invalid && (control?.dirty || control?.touched);
  }
}
