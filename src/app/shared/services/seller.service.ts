import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Auction } from '../models/auction.interface';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  private apiUrl = 'http://localhost:4200/auctions';

  constructor(private http: HttpClient) { }

  createAuction(auction: any): Observable<Auction> {
    return this.http.post<Auction>(this.apiUrl, auction).pipe(
      catchError(this.handleError)
    );
  }

  getSellerAuctions(sellerId: number): Observable<Auction[]> {
    return this.http.get<Auction[]>(`${this.apiUrl}?sellerId=${sellerId}`).pipe(
      catchError(this.handleError)
    );
  }

  cancelAuction(id: number): Observable<Auction> {
    return this.http.patch<Auction>(`${this.apiUrl}/${id}`, { status: 'canceled' }).pipe(
      catchError(this.handleError)
    );
  }

  finalizeAuction(id: number): Observable<Auction> {
    return this.http.patch<Auction>(`${this.apiUrl}/${id}`, { status: 'finalized' }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('SellerService Error:', error);
    return throwError(error);
  }
}