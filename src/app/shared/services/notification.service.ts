import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Notification } from '../models/notification.interface';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = 'http://localhost:4200/notifications';

  constructor(private http: HttpClient) { }

  getUserNotifications(userId: number): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.apiUrl}?userId=${userId}`).pipe(
      catchError(this.handleError)
    );
  }

  markAsRead(notificationId: number): Observable<Notification> {
    return this.http.patch<Notification>(`${this.apiUrl}/${notificationId}`, { read: true }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('NotificationService Error:', error);
    return throwError(error);
  }
}