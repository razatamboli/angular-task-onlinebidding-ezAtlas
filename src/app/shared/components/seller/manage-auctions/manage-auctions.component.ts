// src/app/components/seller/manage-auctions/manage-auctions.component.ts

import { Component, OnInit } from '@angular/core';
import { SellerService } from '../../../services/seller.service';
import { AuthService } from '../../../services/auth.service';
import { Auction } from '../../../models/auction.interface';
import { User } from '../../../models/user.interface';

@Component({
  selector: 'app-manage-auctions',
  templateUrl: './manage-auctions.component.html',
  styleUrls: ['./manage-auctions.component.css']
})
export class ManageAuctionsComponent implements OnInit {
  auctions: Auction[] = [];
  currentUser: User | null = null;
  errorMessage: string = '';

  constructor(private sellerService: SellerService, private authService: AuthService) { }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    if (this.currentUser) {
      this.fetchSellerAuctions();
    }
  }

  fetchSellerAuctions(): void {
    if (this.currentUser) {
      this.sellerService.getSellerAuctions(this.currentUser.id).subscribe(
        data => {
          this.auctions = data;
        },
        error => {
          this.errorMessage = 'Failed to fetch auctions.';
        }
      );
    }
  }

  cancelAuction(id: number): void {
    this.sellerService.cancelAuction(id).subscribe(
      () => {
        this.auctions = this.auctions.filter(auction => auction.id !== id);
      },
      error => {
        this.errorMessage = 'Failed to cancel auction.';
      }
    );
  }

  finalizeAuction(id: number): void {
    this.sellerService.finalizeAuction(id).subscribe(
      () => {
        this.auctions = this.auctions.filter(auction => auction.id !== id);
      },
      error => {
        this.errorMessage = 'Failed to finalize auction.';
      }
    );
  }
}