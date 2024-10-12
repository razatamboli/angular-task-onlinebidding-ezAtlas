// src/app/services/bidder.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bid } from '../models/auction.interface';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BidderService {
  private apiUrl = 'http://localhost:4200/auctions';

  constructor(private http: HttpClient) { }

  placeBid(auctionId: number, bid: Bid): Observable<any> {
    // Fetch the auction, append the bid, and update the auction
    return this.http.get<any>(`${this.apiUrl}/${auctionId}`).pipe(
      catchError(this.handleError),
      // Implement bid placement logic here
      // For simplicity, this can be handled in the component
    );
  }

  private handleError(error: any) {
    console.error('BidderService Error:', error);
    return throwError(error);
  }
}