import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Auction } from '../../../models/auction.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuctionService } from '../../../services/auction.service';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user.interface';
import { Bid } from '../../../models/auction.interface';

@Component({
  selector: 'app-place-bid-dialog',
  templateUrl: './place-bid-dialog.component.html',
  styleUrls: ['./place-bid-dialog.component.css']
})
export class PlaceBidDialogComponent {
  bidForm!: FormGroup;
  currentUser: User | null = null;
  errorMessage: string = '';

  constructor(
    public dialogRef: MatDialogRef<PlaceBidDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { auction: Auction },
    private fb: FormBuilder,
    private auctionService: AuctionService,
    private authService: AuthService
  ) {
    this.currentUser = this.authService.currentUserValue;
    this.buildForm();
  }

  buildForm(): void {
    this.bidForm = this.fb.group({
      amount: ['', [Validators.required, Validators.min(this.data.auction.currentPrice + 1)]]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.bidForm.valid && this.currentUser) {
      const bidAmount = this.bidForm.value.amount;
      const newBid: Bid = {
        id: Date.now(), // Simple unique ID
        bidderId: this.currentUser.id,
        amount: bidAmount,
        timestamp: new Date().toISOString()
      };

      // Update the auction's current price and bid history
      const updatedAuction: Auction = {
        ...this.data.auction,
        currentPrice: bidAmount,
        bidHistory: [...this.data.auction.bidHistory, newBid]
      };

      this.auctionService.updateAuction(this.data.auction.id, updatedAuction).subscribe(
        () => {
          this.dialogRef.close('success');
        },
        error => {
          this.errorMessage = 'Failed to place bid.';
        }
      );
    }
  }
}