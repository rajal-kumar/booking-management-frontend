import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../apis/api.service';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {
  cars: any[] = [];
  services: any[] = [];
  bookings: any[] = [];

  selectedCarId = '';
  selectedServiceId = '';
  customerName = '';

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.login('test@example.com', 'password').subscribe(res => {
      const token = res.headers.get('Authorization');
      localStorage.setItem('jwt', token ?? '');

      this.api.getCars().subscribe(data => this.cars = data.data);
      this.api.getServices().subscribe(data => this.services = data.data);
      this.api.getBookings().subscribe(data => this.bookings = data.data);
    }, err => {
      console.error('Login failed', err);
    });
  }

  submitBooking(): void {
    const payload = {
      booking: {
        customer_name: this.customerName,
        car_id: this.selectedCarId,
        service_id: this.selectedServiceId
      }
    };

    this.api.createBooking(payload).subscribe(res => {
      this.bookings.push(res.data);
      this.customerName = '';
      this.selectedCarId = '';
      this.selectedServiceId = '';
    });
  }
}
