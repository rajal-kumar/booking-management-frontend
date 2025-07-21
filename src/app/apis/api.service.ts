import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = 'http://localhost:4000/api/v1/';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<any>>(
      this.baseUrl + 'users/sign_in',
      {
        user: { email, password }
      },
      { observe: 'response' }
    );
  }


  getCars(): Observable<any> {
    return this.http.get(`${this.baseUrl}/cars`);
  }

  getServices(): Observable<any> {
    return this.http.get(`${this.baseUrl}/services`);
  }

  getBookings(): Observable<any> {
    return this.http.get(`${this.baseUrl}/bookings`);
  }

  createBooking(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/bookings`, data);
  }
}
