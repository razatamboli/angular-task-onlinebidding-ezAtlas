import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Auction } from '../models/auction.interface';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuctionService {
  private apiUrl = 'http://localhost:4200/auctions';

  constructor(private http: HttpClient) { }

  getAllAuctions(): Observable<Auction[]> {
    return this.http.get<Auction[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  getActiveAuctions(): Observable<Auction[]> {
    return this.http.get<Auction[]>(`${this.apiUrl}?status=active`).pipe(
      catchError(this.handleError)
    );
  }

  getAuctionById(id: number): Observable<Auction> {
    return this.http.get<Auction>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  createAuction(auction: Auction): Observable<Auction> {
    return this.http.post<Auction>(this.apiUrl, auction).pipe(
      catchError(this.handleError)
    );
  }

  updateAuction(id: number, auction: Auction): Observable<Auction> {
    return this.http.put<Auction>(`${this.apiUrl}/${id}`, auction).pipe(
      catchError(this.handleError)
    );
  }

  deleteAuction(id: number): Observable<{}> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('AuctionService Error:', error);
    return throwError(error);
  }
}