// src/app/components/bidder/active-auctions/active-auctions.component.ts

import { Component, OnInit } from '@angular/core';
import { AuctionService } from '../../../services/auction.service';
import { Auction } from '../../../models/auction.interface';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user.interface';
import { MatDialog } from '@angular/material/dialog';
import { PlaceBidDialogComponent } from '../place-bid-dialog/place-bid-dialog.component';

@Component({
  selector: 'app-active-auctions',
  templateUrl: './active-auctions.component.html',
  styleUrls: ['./active-auctions.component.css']
})
export class ActiveAuctionsComponent implements OnInit {
  auctions: Auction[] = [];
  currentUser: User | null = null;
  errorMessage: string = '';

  constructor(
    private auctionService: AuctionService,
    private authService: AuthService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.fetchActiveAuctions();
  }

  fetchActiveAuctions(): void {
    this.auctionService.getActiveAuctions().subscribe(
      data => {
        this.auctions = data;
      },
      error => {
        this.errorMessage = 'Failed to fetch active auctions.';
      }
    );
  }

  openBidDialog(auction: Auction): void {
    const dialogRef = this.dialog.open(PlaceBidDialogComponent, {
      width: '300px',
      data: { auction }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.fetchActiveAuctions();
      }
    });
  }
}