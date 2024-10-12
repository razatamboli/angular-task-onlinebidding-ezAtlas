import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { AuctionService } from '../../../services/auction.service';
import { Auction } from '../../../models/auction.interface';
import { User } from '../../../models/user.interface';

@Component({
  selector: 'app-bid-history',
  templateUrl: './bid-history.component.html',
  styleUrls: ['./bid-history.component.css']
})
export class BidHistoryComponent implements OnInit {
  currentUser: User | null = null;
  bidHistory: { auction: Auction, bid: any }[] = [];
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private auctionService: AuctionService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    if (this.currentUser) {
      this.fetchBidHistory();
    }
  }

  fetchBidHistory(): void {
    this.auctionService.getAllAuctions().subscribe(
      auctions => {
        auctions.forEach(auction => {
          auction.bidHistory.forEach(bid => {
            if (bid.bidderId === this.currentUser?.id) {
              this.bidHistory.push({ auction, bid });
            }
          });
        });
      },
      error => {
        this.errorMessage = 'Failed to fetch bid history.';
      }
    );
  }
}