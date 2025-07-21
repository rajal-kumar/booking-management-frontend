import { Component, signal } from '@angular/core';
import { BookingsComponent } from './bookings/bookings.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BookingsComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('booking-management-frontend');
}
