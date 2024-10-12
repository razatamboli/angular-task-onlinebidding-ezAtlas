// src/app/components/seller/create-auction/create-auction.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SellerService } from '../../../services/seller.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user.interface';

@Component({
  selector: 'app-create-auction',
  templateUrl: './create-auction.component.html',
  styleUrls: ['./create-auction.component.css']
})
export class CreateAuctionComponent implements OnInit {
  auctionForm!: FormGroup;
  currentUser: User | null = null;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private sellerService: SellerService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.buildForm();
  }

  buildForm(): void {
    this.auctionForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      startingPrice: [0, [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit(): void {
    if (this.auctionForm.valid && this.currentUser) {
      const { title, description, startingPrice } = this.auctionForm.value;
      const newAuction = {
        sellerId: this.currentUser.id,
        title,
        description,
        startingPrice,
        currentPrice: startingPrice,
        status: 'active',
        bidHistory: []
      };

      this.sellerService.createAuction(newAuction).subscribe(
        () => {
          this.router.navigate(['/seller/manage-auctions']);
        },
        error => {
          this.errorMessage = 'Failed to create auction. Please try again.';
        }
      );
    }
  }
}